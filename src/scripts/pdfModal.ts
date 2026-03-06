// Shared PDF modal logic — imported by PDFViewer, KnowledgeSheet, ActivitySection
// Uses AbortController so re-init on Astro View Transitions is clean

let controller: AbortController | null = null;

function initPDFModal() {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;

  const close = (modal: Element | null) => {
    modal?.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e: MouseEvent) => {
    const t = e.target as Element;

    // Open — click on any .pdf-open-btn with data-pdf-id
    const btn = t.closest('.pdf-open-btn') as HTMLElement | null;
    if (btn?.dataset.pdfId) {
      const modal = document.getElementById(btn.dataset.pdfId);
      if (!modal) return;
      const iframe = modal.querySelector('.pdf-iframe') as HTMLIFrameElement | null;
      if (iframe && !iframe.src) iframe.src = btn.dataset.pdfSrc ?? '';
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      return;
    }

    // Close button
    const closeBtn = t.closest('.pdf-close-btn');
    if (closeBtn) {
      close(closeBtn.closest('.pdf-modal'));
      return;
    }

    // Click on the dark backdrop
    if (t.classList.contains('pdf-backdrop')) {
      close(t.closest('.pdf-modal'));
    }
  }, { signal });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      document.querySelectorAll<Element>('.pdf-modal.is-open').forEach(close);
    }
  }, { signal });
}

initPDFModal();
document.addEventListener('astro:after-swap', initPDFModal);
