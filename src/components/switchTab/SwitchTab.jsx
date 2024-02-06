import React, { useState } from "react";
import "./style.scss";
import { nanoid } from "@reduxjs/toolkit";

const SwitchTab = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab);
  };

  return (
    <div className="switchingTab">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={nanoid()}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => {
              activeTab(tab, index);
            }}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTab;
