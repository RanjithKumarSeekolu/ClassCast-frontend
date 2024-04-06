import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <ul className="flex border-b">
        {children.map((tab) => (
          <li className={`-mb-px mr-1`}>
            <button
              key={tab.props.label}
              className={`inline-block py-2 px-4 font-semibold ${
                tab.props.label === activeTab
                  ? "border-l border-t border-r rounded-t text-blue-700 bg-white"
                  : "text-blue-500 hover:text-blue-800 bg-gray-100"
              }`}
              onClick={(e) => handleClick(e, tab.props.label)}
            >
              {tab.props.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content p-4">
        {children.map((content) => {
          if (content.props.label !== activeTab) return undefined;
          return content.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
