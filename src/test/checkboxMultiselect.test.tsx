import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import CheckboxMultiselect from "@/components/atoms/CheckboxMultiselect";

describe("CheckboxMultiselect", () => {
  it("renders placeholder and toggles selection with click and keyboard", async () => {
    const options = [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B", disable: true },
    ];
    const onChange = vi.fn();

    render(
      <CheckboxMultiselect options={options} value={[]} onChange={onChange} />
    );

    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();

    // open popover by clicking trigger
    fireEvent.click(trigger);

    // click enabled option
    const optA = await screen.findByText("Option A");
    fireEvent.click(optA);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual([
      { value: "a", label: "Option A" },
    ]);

    // pressing Enter on enabled option toggles
    fireEvent.keyDown(optA, { key: "Enter" });
    expect(onChange).toHaveBeenCalledTimes(2);

    // disabled option should not call onChange
    const optB = await screen.findByText("Option B");
    fireEvent.click(optB);
    // still 2 calls
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
