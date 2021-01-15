import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import RenderInput from './RenderInput'

afterEach(() => cleanup());

describe('Rendering', () => {
  it("正常にRenderすること", () => {
    render(<RenderInput />)
    expect(screen.getByRole("button")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
  });
});

describe('入力された変更を検知すること', () => {
  it("値が入力される", () => {
    render(<RenderInput />)
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test") //* user が 「test」と入力したと想定
    expect(inputValue.value).toBe("test");
  });
});

describe('コンソール表示', () => {
  it('inputの値が空の場合は、関数が呼ばれないこと', () => {
      const outputConsole = jest.fn(); //* 関数として呼ばれるか否かだけ判定
      render(<RenderInput outputConsole={ outputConsole } />);
      userEvent.click(screen.getByRole("button"));
      expect(outputConsole).not.toHaveBeenCalled();
  });

  it('inputの値が存在する場合は、関数が呼ばれること', () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={ outputConsole } />);
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test")
    userEvent.click(screen.getByRole("button"));
    expect(outputConsole).toHaveBeenCalledTimes(1); //* 1回だけ呼ばれること
  });
});


