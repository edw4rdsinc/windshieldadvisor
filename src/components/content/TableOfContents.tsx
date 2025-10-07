'use client';

import React, { useState, useEffect } from 'react';
import type { TableOfContentsItem } from '@/types/content';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    // Observe all sections
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);

      // Observe children
      item.children?.forEach((child) => {
        const childElement = document.getElementById(child.id);
        if (childElement) observer.observe(childElement);
      });
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`
        bg-gray-50 border border-gray-200 rounded-lg p-6
        sticky top-24
        ${className}
      `}
      aria-label="Table of contents"
    >
      <h3 className="font-bold text-lg mb-4 text-deep-navy-900">
        On This Page
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`
                text-left w-full px-3 py-2 rounded text-sm transition-colors
                hover:bg-safety-blue-50 hover:text-safety-blue-800
                ${
                  activeId === item.id
                    ? 'bg-safety-blue-100 text-safety-blue-800 font-semibold'
                    : 'text-gray-700'
                }
              `}
            >
              {item.title}
            </button>

            {/* Nested items (H3s) */}
            {item.children && item.children.length > 0 && (
              <ul className="ml-4 mt-2 space-y-1">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <button
                      onClick={() => scrollToSection(child.id)}
                      className={`
                        text-left w-full px-3 py-1.5 rounded text-xs transition-colors
                        hover:bg-safety-blue-50 hover:text-safety-blue-800
                        ${
                          activeId === child.id
                            ? 'text-safety-blue-800 font-medium'
                            : 'text-gray-600'
                        }
                      `}
                    >
                      {child.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
