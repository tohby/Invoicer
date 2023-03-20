import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import Login from "./Pages/login";

describe("Login page", () => {
  const queryClient = new QueryClient();

  it("renders the login form", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("submits the login form", async () => {
    const mockLogin = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, {
      target: { value: "dung+octopus4@101digital.io" },
    });
    fireEvent.change(passwordInput, { target: { value: "Abc@123456" } });
    fireEvent.click(submitButton);
  });
});
