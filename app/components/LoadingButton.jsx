'use client';

export default function LoadingButton({ loading, onClick, children, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded disabled:opacity-50 ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
