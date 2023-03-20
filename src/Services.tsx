import {
  LoginCredentials,
  AccessTokenResponse,
  OrgTokenResponse,
  LoginResponse,
} from "./Interface";
import React from "react";

const BASEURL = "https://sandbox.101digital.io";

export async function fetchInvoices({
  page,
  filter,
}: {
  page: number;
  filter: string;
}) {
  const access_token = localStorage.getItem("access_token");
  const org_token = localStorage.getItem("org_token");
  const response = await fetch(
    `${BASEURL}/invoice-service/1.0.0/invoices?pageNum=${page}&pageSize=20`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Org-Token": `${org_token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export const auth = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${BASEURL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "password",
      scope: "openid",
      username: credentials.username,
      password: credentials.password,
      client_id: "oO8BMTesSg9Vl3_jAyKpbOd2fIEa",
      client_secret: "0Exp4dwqmpON_ezyhfm0o_Xkowka",
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const { access_token } = (await response.json()) as AccessTokenResponse;

  const orgTokenResponse = await fetch(
    `${BASEURL}/membership-service/1.2.0/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!orgTokenResponse.ok) {
    const errorData = await orgTokenResponse.json();
    throw new Error(errorData.message);
  }

  const { data } = (await orgTokenResponse.json()) as OrgTokenResponse;

  return { access_token, data };
};
