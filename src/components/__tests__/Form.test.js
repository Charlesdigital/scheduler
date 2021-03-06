import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);
//it.only for just 1 test

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );


    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });


  it("validates that the student name is not blank", () => {
    //jest is passing in dummy data, will get an error without
    const onSave = jest.fn()

    const { getByText } = render(
      <Form interviewers={interviewers} student="" onSave={onSave} />
    );
    const saveButton = getByText("Save")
    // console.log(saveButton)
    fireEvent.click(saveButton)
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    /* 2. onSave is not called */
    //mock onSave
    expect(onSave).not.toHaveBeenCalled();
  });

  // it("calls onSave function when the name is defined", () => {
  //   /* 3. validation is not shown */
  //   const onSave = jest.fn();
  //   const { getByText, queryByText } = render(
  //     <Form
  //       interviewers={interviewers}
  //       onSave={onSave}
  //       name="Lydia Miller-Jones"
  //     />
  //   );
  //   fireEvent.click(getByText("Save"));
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();

  //   /* 4. onSave is called once*/
  //   expect(onSave).toHaveBeenCalledTimes(1);

  //   /* 5. onSave is called with the correct arguments */
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    const input = getByPlaceholderText("Enter Student Name");

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
  //?
  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});