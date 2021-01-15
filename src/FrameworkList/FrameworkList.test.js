import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import FrameworkList from './FrameworkList';

afterEach(() => cleanup());

describe('正常にRenderされること', () => {
  it("Propsの値が存在しなければ No Data と表示されること", () => {
    render(<FrameworkList />);
    expect(screen.getByText("No Data!!!")).toBeInTheDocument();
  })

  it("Propsで中身が正しくRenderされていること", () => {
      const dummyData = [
        {
          id: 1,
          item: "React Dummy"
        },
        {
          id: 2,
          item: "Angular Dummy"
        },
        {
          id: 3,
          item: "Vue.js Dummy"
        },
      ];
      render(<FrameworkList frameworks={ dummyData } />);
      const frameWorkItems = screen
        .getAllByRole("listitem")
        .map((ele) => (ele.textContent));
      const dummyItems = dummyData.map((ele) => ele.item);
      expect(frameWorkItems).toEqual(dummyItems);
      expect(screen.queryByText("No Data!!!")).toBeNull();
  })
})
