import React from 'react';

interface SectionAnchorProps {
  id: string;
  children: React.ReactNode;
}

const SectionAnchor: React.FC<SectionAnchorProps> = ({ id, children }) => {
  return (
    <section id={id} className="scroll-mt-24">
      {children}
    </section>
  );
};

export default SectionAnchor;