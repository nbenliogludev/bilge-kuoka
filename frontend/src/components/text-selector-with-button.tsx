import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Icons } from './ui/icons';

type Position = {
  top: number;
  left: number;
} | null;

interface TextSelectorWithButtonProps {
    children: React.ReactNode;
    loading?: boolean;
    onClick: () => void;
    setSelectedText: (text: string) => void;
}

const TextSelectorWithButton: FC<TextSelectorWithButtonProps> = ({ children, loading, onClick, setSelectedText }) => {
  const [buttonPosition, setButtonPosition] = useState<Position>(null);
  const location = useLocation();

  useEffect(() => {
    if(!loading){
        setButtonPosition(null);
    }
  }, [location, loading]);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedText(selection.toString());
      setButtonPosition({
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX,
      });
    } else {
      setButtonPosition(null);
    }
  };

  return (
    <div onMouseUp={handleMouseUp} style={{ padding: '20px' }}>
      {children}
      {buttonPosition && (
        <Button variant="outline" 
            onClick={onClick}
            style={{
                position: 'absolute',
                top: buttonPosition.top + 30,
                left: buttonPosition.left,
                transform: 'translateX(-50%)',
                zIndex: 1000,
              }}
        >
            <span >
                {loading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : 'Bu nedir?'}
            </span>
            
        </Button>
      )}
    </div>
  );
}

export default TextSelectorWithButton;
