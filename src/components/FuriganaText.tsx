import React from 'react';

interface FuriganaTextProps {
  content: string;
  className?: string;
  rtClassName?: string;
}

/**
 * Robust Furigana renderer that supports both standard HTML <ruby>...<rt>...</rt></ruby>
 * and shorthand format {Kanji|furigana} or [Kanji|furigana].
 */
export const FuriganaText: React.FC<FuriganaTextProps> = ({
  content,
  className = '',
  rtClassName = '',
}) => {
  if (!content) return null;

  // 1. If content contains <ruby> tags, parse them into safe React elements
  if (content.includes('<ruby>') || content.includes('<ruby ')) {
    const parts = parseRubyHtml(content);
    return (
      <span className={`inline-flex flex-wrap items-end gap-x-0.5 leading-relaxed ${className}`}>
        {parts.map((part, index) => {
          if (part.type === 'ruby') {
            return (
              <ruby key={index} className="inline-flex flex-col-reverse text-center align-bottom leading-tight">
                <span className="font-bold text-inherit">{part.kanji}</span>
                <rt className={`text-[0.68em] font-bold leading-none select-none text-current ${rtClassName}`}>
                  {part.furigana}
                </rt>
              </ruby>
            );
          }
          return <span key={index} className="font-bold text-inherit">{part.text}</span>;
        })}
      </span>
    );
  }

  // 2. If content contains bracket syntax: {漢字|かんじ} or [漢字|かんじ]
  if (/[\{\[][^\|\}]+?\|[^\|\}]+?[\}\]]/.test(content)) {
    const tokens = parseBracketNotation(content);
    return (
      <span className={`inline-flex flex-wrap items-end gap-x-0.5 leading-relaxed ${className}`}>
        {tokens.map((token, index) => {
          if (token.isRuby) {
            return (
              <ruby key={index} className="inline-flex flex-col-reverse text-center align-bottom leading-tight">
                <span className="font-bold text-inherit">{token.kanji}</span>
                <rt className={`text-[0.68em] font-bold leading-none select-none text-current ${rtClassName}`}>
                  {token.furigana}
                </rt>
              </ruby>
            );
          }
          return <span key={index} className="font-bold text-inherit">{token.text}</span>;
        })}
      </span>
    );
  }

  // 3. Fallback: plain text
  return <span className={className}>{content}</span>;
};

interface RubyParsed {
  type: 'text' | 'ruby';
  text?: string;
  kanji?: string;
  furigana?: string;
}

function parseRubyHtml(htmlString: string): RubyParsed[] {
  const result: RubyParsed[] = [];
  const regex = /<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(htmlString)) !== null) {
    if (match.index > lastIndex) {
      result.push({
        type: 'text',
        text: htmlString.substring(lastIndex, match.index),
      });
    }
    result.push({
      type: 'ruby',
      kanji: match[1],
      furigana: match[2],
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < htmlString.length) {
    result.push({
      type: 'text',
      text: htmlString.substring(lastIndex),
    });
  }

  return result;
}

function parseBracketNotation(str: string): { isRuby: boolean; text?: string; kanji?: string; furigana?: string }[] {
  const result: { isRuby: boolean; text?: string; kanji?: string; furigana?: string }[] = [];
  const regex = /[\{\[]([^{}[\]|]+)\|([^{}[\]|]+)[\}\]]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      result.push({
        isRuby: false,
        text: str.substring(lastIndex, match.index),
      });
    }
    result.push({
      isRuby: true,
      kanji: match[1],
      furigana: match[2],
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < str.length) {
    result.push({
      isRuby: false,
      text: str.substring(lastIndex),
    });
  }

  return result;
}
