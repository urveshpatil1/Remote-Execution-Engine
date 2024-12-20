import { PanelResizeHandle } from 'react-resizable-panels';

const style = {
  ResizeHandleOuter: {
    position: 'relative',
    outline: 'none',
    backgroundColor: 'transparent',
  },
};

function Resize({ className = '', id }: { className?: string; id?: string }) {
  return (
    <PanelResizeHandle className={[style.ResizeHandleOuter, className].join(' ')} id={id}>
      <div
        style={{ transition: 'background-color 0.2s linear' }}
        className="relative m-1 h-[95%] w-[10px] active:bg-slate-500 bg-transparent rounded-full"
      >
        <svg
          style={{
            width: '1em',
            height: '1em',
            padding: '2px',
            position: 'absolute',
            left: 'calc(50% - 0.5rem)',
            top: 'calc(50% - 0.5rem)',
          }}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
          />
        </svg>
      </div>
    </PanelResizeHandle>
  );
}

export default Resize;
