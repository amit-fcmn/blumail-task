const MAX_CONTENT_LENGTH = 16384;
const POLL_INTERVAL_MS = 3000;
const IN_PROGRESS_STATUSES = ['RECEIVED', 'ANALYZING'];

const alertEl = document.getElementById('alert');
const submitForm = document.getElementById('submit-form');
const contentInput = document.getElementById('content');
const charCountEl = document.getElementById('char-count');
const submitBtn = document.getElementById('submit-btn');
const statusFilter = document.getElementById('status-filter');
const refreshBtn = document.getElementById('refresh-btn');
const feedbackTbody = document.getElementById('feedback-tbody');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfoEl = document.getElementById('page-info');
const detailSection = document.getElementById('detail-section');
const detailContent = document.getElementById('detail-content');
const closeDetailBtn = document.getElementById('close-detail');
const retryBtn = document.getElementById('retry-btn');

const state = {
  page: 1,
  limit: 20,
  selectedId: null,
  detailStatus: null,
  pollTimer: null,
};

/**
 * Clears all child nodes from an element.
 * @param {HTMLElement} element - Target element
 */
function clearElement(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}

/**
 * Appends a text node to a parent element.
 * @param {HTMLElement} parent - Parent element
 * @param {string} text - Text content
 * @returns {HTMLElement} Created span element
 */
function appendText(parent, text) {
  const span = document.createElement('span');
  span.textContent = text;
  parent.appendChild(span);
  return span;
}

/**
 * Shows or hides the global alert banner.
 * @param {string} message - Alert message
 * @param {'error' | 'success'} [type='error'] - Alert style
 */
function showAlert(message, type = 'error') {
  alertEl.textContent = message;
  alertEl.classList.remove('hidden', 'success');
  if (type === 'success') alertEl.classList.add('success');
}

/**
 * Hides the global alert banner.
 */
function hideAlert() {
  alertEl.classList.add('hidden');
  alertEl.classList.remove('success');
  alertEl.textContent = '';
}

/**
 * Performs a JSON API request.
 * @param {string} url - Request URL
 * @param {RequestInit} [options] - Fetch options
 * @returns {Promise<unknown>} Parsed JSON body
 */
async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const bodyText = await response.text();
  let body = null;
  if (bodyText.length > 0) {
    try {
      body = JSON.parse(bodyText);
    } catch {
      body = { message: bodyText };
    }
  }
  if (response.ok === false) {
    const message =
      typeof body?.message === 'string'
        ? body.message
        : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return body;
}

/**
 * Truncates text for table preview cells.
 * @param {string} text - Full text
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

/**
 * Formats an ISO date string for display.
 * @param {string} iso - ISO timestamp
 * @returns {string} Localized date/time
 */
function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString();
}

/**
 * Returns whether a status is still being processed.
 * @param {string} status - Feedback status
 * @returns {boolean} True when in progress
 */
function isInProgress(status) {
  return IN_PROGRESS_STATUSES.includes(status);
}

/**
 * Stops the polling timer if active.
 */
function stopPolling() {
  if (state.pollTimer === null) return;
  clearInterval(state.pollTimer);
  state.pollTimer = null;
}

/**
 * Starts polling when list or detail has in-progress items.
 * @param {Array<{ status: string }>} items - Visible feedback rows
 * @param {string | null} detailStatus - Selected detail status
 */
function syncPolling(items, detailStatus) {
  const listHasInProgress = items.some((item) => isInProgress(item.status));
  const detailInProgress =
    detailStatus !== null && isInProgress(detailStatus);
  const shouldPoll = listHasInProgress || detailInProgress;
  if (shouldPoll === false) {
    stopPolling();
    return;
  }
  if (state.pollTimer !== null) return;
  state.pollTimer = setInterval(async () => {
    await loadFeedbackList();
    if (state.selectedId !== null) await loadFeedbackDetail(state.selectedId);
  }, POLL_INTERVAL_MS);
}

/**
 * Loads paginated feedback and renders the table.
 */
async function loadFeedbackList() {
  const status = statusFilter.value;
  const params = new URLSearchParams();
  params.set('page', String(state.page));
  params.set('limit', String(state.limit));
  if (status.length > 0) params.set('status', status);

  const url = `/feedback?${params.toString()}`;
  const result = await fetchJson(url);
  const items = result.data || [];
  const meta = result.meta || { page: 1, limit: 20, total: 0 };

  renderFeedbackTable(items);
  renderPagination(meta);

  const listDetailStatus =
    state.selectedId !== null
      ? items.find((item) => item.id === state.selectedId)?.status
      : undefined;
  const detailStatus =
    listDetailStatus !== undefined ? listDetailStatus : state.detailStatus;
  syncPolling(items, detailStatus);
}

/**
 * Renders feedback rows in the list table.
 * @param {Array<Record<string, unknown>>} items - Feedback records
 */
function renderFeedbackTable(items) {
  clearElement(feedbackTbody);

  if (items.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 5;
    cell.textContent = 'No feedback yet.';
    row.appendChild(cell);
    feedbackTbody.appendChild(row);
    return;
  }

  items.forEach((item) => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.className = 'id-cell';
    idCell.textContent = truncateText(String(item.id), 12);
    row.appendChild(idCell);

    const previewCell = document.createElement('td');
    previewCell.className = 'preview-cell';
    previewCell.textContent = truncateText(String(item.content), 80);
    row.appendChild(previewCell);

    const statusCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge badge-${item.status}`;
    badge.textContent = String(item.status);
    statusCell.appendChild(badge);
    row.appendChild(statusCell);

    const updatedCell = document.createElement('td');
    updatedCell.textContent = formatDate(String(item.updatedAt));
    row.appendChild(updatedCell);

    const actionCell = document.createElement('td');
    const viewBtn = document.createElement('button');
    viewBtn.type = 'button';
    viewBtn.className = 'secondary';
    viewBtn.textContent = 'View';
    viewBtn.addEventListener('click', () => {
      void openDetail(String(item.id));
    });
    actionCell.appendChild(viewBtn);
    row.appendChild(actionCell);

    feedbackTbody.appendChild(row);
  });
}

/**
 * Updates pagination controls from API meta.
 * @param {{ page: number, limit: number, total: number }} meta - Pagination meta
 */
function renderPagination(meta) {
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));
  pageInfoEl.textContent = `Page ${meta.page} of ${totalPages} (${meta.total} total)`;
  prevPageBtn.disabled = meta.page <= 1;
  nextPageBtn.disabled = meta.page >= totalPages;
  state.page = meta.page;
}

/**
 * Opens the detail panel for a feedback id.
 * @param {string} id - Feedback id
 */
async function openDetail(id) {
  state.selectedId = id;
  detailSection.classList.remove('hidden');
  await loadFeedbackDetail(id);
}

/**
 * Loads and renders feedback detail.
 * @param {string} id - Feedback id
 */
async function loadFeedbackDetail(id) {
  const item = await fetchJson(`/feedback/${id}`);
  state.detailStatus = String(item.status);
  renderFeedbackDetail(item);
  syncPolling([], state.detailStatus);
}

/**
 * Renders the detail panel for one feedback item.
 * @param {Record<string, unknown>} item - Feedback record
 */
function renderFeedbackDetail(item) {
  clearElement(detailContent);

  const metaBlock = document.createElement('div');
  metaBlock.className = 'detail-block detail-meta';
  appendText(metaBlock, `ID: ${String(item.id)} · Status: `);
  const statusBadge = document.createElement('span');
  statusBadge.className = `badge badge-${item.status}`;
  statusBadge.textContent = String(item.status);
  metaBlock.appendChild(statusBadge);
  appendText(
    metaBlock,
    ` · Attempts: ${String(item.attemptCount)} · Updated: ${formatDate(String(item.updatedAt))}`,
  );
  detailContent.appendChild(metaBlock);

  const contentBlock = document.createElement('div');
  contentBlock.className = 'detail-block';
  const contentTitle = document.createElement('h3');
  contentTitle.textContent = 'Content';
  contentBlock.appendChild(contentTitle);
  const contentBody = document.createElement('p');
  contentBody.textContent = String(item.content);
  contentBlock.appendChild(contentBody);
  detailContent.appendChild(contentBlock);

  const analysis = item.latestAnalysis;
  if (analysis !== null && analysis !== undefined) {
    const analysisBlock = document.createElement('div');
    analysisBlock.className = 'detail-block';
    const analysisTitle = document.createElement('h3');
    analysisTitle.textContent = 'Analysis';
    analysisBlock.appendChild(analysisTitle);

    if (analysis.errorMessage) {
      const errorP = document.createElement('p');
      errorP.className = 'error-text';
      errorP.textContent = String(analysis.errorMessage);
      analysisBlock.appendChild(errorP);
    }

    const structured = analysis.structuredResult;
    if (structured !== null && structured !== undefined) {
      const sentimentP = document.createElement('p');
      sentimentP.textContent = `Sentiment: ${String(structured.sentiment)}`;
      analysisBlock.appendChild(sentimentP);

      const insightP = document.createElement('p');
      insightP.textContent = String(structured.actionable_insight);
      analysisBlock.appendChild(insightP);

      const requests = structured.feature_requests || [];
      if (requests.length > 0) {
        const listTitle = document.createElement('p');
        listTitle.textContent = 'Feature requests:';
        analysisBlock.appendChild(listTitle);
        const list = document.createElement('ul');
        list.className = 'insight-list';
        requests.forEach((request) => {
          const li = document.createElement('li');
          li.textContent = `${String(request.title)} (${String(request.confidence)})`;
          list.appendChild(li);
        });
        analysisBlock.appendChild(list);
      }
    }

    detailContent.appendChild(analysisBlock);
  }

  const isFailed = item.status === 'FAILED';
  retryBtn.classList.toggle('hidden', isFailed === false);
}

/**
 * Submits new feedback content.
 * @param {string} content - Feedback text
 */
async function submitFeedback(content) {
  submitBtn.disabled = true;
  hideAlert();
  try {
    const result = await fetchJson('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    contentInput.value = '';
    updateCharCount();
    showAlert(`Submitted (${String(result.status)}).`, 'success');
    state.page = 1;
    await loadFeedbackList();
    await openDetail(String(result.id));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Submit failed';
    showAlert(message);
  } finally {
    submitBtn.disabled = false;
  }
}

/**
 * Retries analysis for the selected feedback item.
 */
async function retrySelected() {
  if (state.selectedId === null) return;
  retryBtn.disabled = true;
  hideAlert();
  try {
    await fetchJson(`/feedback/${state.selectedId}/retry`, { method: 'POST' });
    showAlert('Retry queued.', 'success');
    await loadFeedbackDetail(state.selectedId);
    await loadFeedbackList();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Retry failed';
    showAlert(message);
  } finally {
    retryBtn.disabled = false;
  }
}

/**
 * Updates the character count label for the textarea.
 */
function updateCharCount() {
  charCountEl.textContent = String(contentInput.value.length);
}

contentInput.addEventListener('input', updateCharCount);

submitForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const content = contentInput.value.trim();
  if (content.length === 0) {
    showAlert('Feedback cannot be empty.');
    return;
  }
  if (content.length > MAX_CONTENT_LENGTH) {
    showAlert(`Feedback must be at most ${MAX_CONTENT_LENGTH} characters.`);
    return;
  }
  void submitFeedback(content);
});

statusFilter.addEventListener('change', () => {
  state.page = 1;
  void loadFeedbackList();
});

refreshBtn.addEventListener('click', () => {
  void loadFeedbackList();
});

prevPageBtn.addEventListener('click', () => {
  if (state.page <= 1) return;
  state.page -= 1;
  void loadFeedbackList();
});

nextPageBtn.addEventListener('click', () => {
  state.page += 1;
  void loadFeedbackList();
});

closeDetailBtn.addEventListener('click', () => {
  state.selectedId = null;
  state.detailStatus = null;
  detailSection.classList.add('hidden');
  clearElement(detailContent);
  retryBtn.classList.add('hidden');
  stopPolling();
  void loadFeedbackList();
});

retryBtn.addEventListener('click', () => {
  void retrySelected();
});

updateCharCount();
void loadFeedbackList();
