import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import MockServer from './MockServer'

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
)

beforeAll(() => server.listen()) //file を見る時初めに呼ぶ
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Mock API', () => {
  it('fetchが成功した ボタンがdisabledになること', async () => {
      render(<MockServer />);
      userEvent.click(screen.getByRole("button"));
      expect(await screen.findByText("Bred dummy")).toBeInTheDocument();;
      expect(screen.getByRole("button")).toHaveAttribute("disabled");
  })
  it('fetch が失敗した エラーメッセージが表示 ボタンが活性', async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
      })
    );
    render(<MockServer />);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed!"
    )
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole('button')).not.toHaveAttribute("disabled");
  })
})
