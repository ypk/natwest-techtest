// https://johnsmilga.com/articles/2024/10/15

import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { expect, afterEach } from "vitest";
import * as matchers from '@testing-library/jest-dom/matchers'

/**
 * Adds Testing Library's DOM assertions to Vitest's expect API
 * so tests can use readable matchers such as `toBeInTheDocument`,
 * `toHaveTextContent`, etc.
 */
expect.extend(matchers)

/**
 * Unmounts React trees after each test to avoid DOM state
 * leaking between tests.
 */
afterEach(() => {
	cleanup();
});