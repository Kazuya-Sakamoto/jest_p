import React from "react";
import { render, screen } from '@testing-library/react';
import Render from './Render';

describe("Rendering", () => {
  it("正常にRenderすること", () => {
    render(<Render />);
    // screen.debug(screen.getByRole("heading"));
    // screen.debug();
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    expect(screen.getAllByText("Jest")).toBeTruthy();
    expect(screen.queryByText("Ro")).toBeNull();
    expect(screen.getByTestId("copy")).toBeTruthy();
  });
});