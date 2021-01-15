import React from "react";
import { render, screen } from '@testing-library/react';
import UseEffectRender from './UseEffectRender';

describe('正常にRenderされること', () => {
  it ('async関数が呼ばれた後にRenderされること', async () => {
    render(<UseEffectRender />);
    expect(screen.queryByText(/I am/)).toBeNull();
    expect(await screen.findByText(/I am/)).toBeInTheDocument(); // 非同期関数が呼ばれた後に Renderingの遅れをテスト
  })
})
