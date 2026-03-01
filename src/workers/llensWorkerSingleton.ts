let _worker: Worker | null = null;
let _isReady = false;
let _loadRequested = false;

const ensureWorker = (): Worker => {
  if (!_worker) {
    _worker = new Worker(new URL("./llens.worker.ts", import.meta.url), {
      type: "module",
    });
    // Track ready state in the singleton so LlensHome can query it on mount
    _worker.addEventListener("message", (event: MessageEvent) => {
      if (event.data?.type === "ready") {
        _isReady = true;
      }
    });
  }
  return _worker;
};

/** Start loading the model now. Safe to call multiple times. */
export const preloadLlensModel = () => {
  if (_loadRequested) return;
  _loadRequested = true;
  const worker = ensureWorker();
  worker.postMessage({ type: "load" });
};

/** Get (or create) the shared worker instance. */
export const getLlensWorker = (): Worker => {
  return ensureWorker();
};

/** True if the worker has already emitted "ready" before LlensHome mounted. */
export const isLlensModelReady = (): boolean => _isReady;
