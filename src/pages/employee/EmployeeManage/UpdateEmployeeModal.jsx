// import React, { useEffect, useState } from "react";
// import { Modal, Form, Input, Select, DatePicker, Row, Col, Radio } from "antd";
// import "../Employee.css";

// const { Option } = Select;

// const UpdateEmployeeModal = ({
//   visible,
//   onUpdate,
//   onCancel,
//   loading,
//   employee,
// }) => {
//   const [form] = Form.useForm();
//   const [userType, setUserType] = useState(employee?.RoleId);
//   //   console.log(employee);

//   useEffect(() => {
//     if (visible) {
//       form.setFieldsValue({
//         EmployeeId: employee?.EmployeeId,
//         Name: employee?.Name,
//         Email: employee?.Email,
//         Phone: employee?.Phone,
//         Gender: employee?.Gender,
//         DoB: employee?.dob,
//         RoleId: employee?.RoleId,
//         // CounterId: employee?.CounterId,
//       });
//       setUserType(employee?.RoleId);
//     }
//   }, [form, visible, employee]);

//   const handleDateChange = (date, dateString) => {
//     console.log("Selected DOB:", date);
//   };

//   const handleUserTypeChange = (value) => {
//     setUserType(value);
//     if (value === 1 || value === 2) {
//       form.setFieldsValue({ counter: null });
//     }
//   };

//   return (
//     <div className="update-employee-page">
//       <Modal
//         open={visible}
//         title="Update Employee"
//         okText="Update"
//         cancelText="Cancel"
//         onCancel={onCancel}
//         okButtonProps={{ loading }}
//         onOk={() => {
//           form
//             .validateFields()
//             .then((values) => {
//               if (values.dob) {
//                 values.dob = Math.floor(values.dob.valueOf() / 1000);
//               }
//               onUpdate(values);
//             })
//             .catch((info) => {
//               console.log("Validate Failed:", info);
//             });
//         }}
//       >
//         <Form
//           form={form}
//           name="form_in_modal"
//           initialValues={{
//             modifier: "public",
//           }}
//         >
//           <Row>
//             <Form.Item
//               style={{ display: "none" }}
//               name="EmployeeId"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input the name of the user!",
//                 },
//               ]}
//             >
//               <Input placeholder="Input the full name..." />
//             </Form.Item>
//             <Col span={8}>
//               <p>Full Name:</p>
//             </Col>
//             <Col span={16}>
//               <Form.Item
//                 name="Name"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the name of the user!",
//                   },
//                 ]}
//               >
//                 <Input placeholder="Input the full name..." />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <p>Email:</p>
//             </Col>
//             <Col span={16}>
//               <Form.Item
//                 name="Email"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the email of the user!",
//                   },
//                   {
//                     pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                     message: "Please input a valid email address!",
//                   },
//                 ]}
//               >
//                 <Input placeholder="Input the email..." />
//               </Form.Item>
//             </Col>
//             <Col span={8}>
//               <p>Phone number:</p>
//             </Col>
//             <Col span={16}>
//               <Form.Item
//                 name="Phone"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the phone number of the user!",
//                   },
//                   {
//                     pattern: /^[0-9]{10}$/,
//                     message: "Please input a valid 10-digit phone number!",
//                   },
//                 ]}
//               >
//                 <Input placeholder="Input the phone number..." />
//               </Form.Item>
//             </Col>
//             <Col span={8}>Gender</Col>
//             <Col span={16}>
//               <Form.Item
//                 name="Gender"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please choose the gender!",
//                   },
//                 ]}
//               >
//                 <Radio.Group>
//                   <Radio value={0}> Male </Radio>
//                   <Radio value={1}> Female </Radio>
//                 </Radio.Group>
//               </Form.Item>
//             </Col>
//             <Col span={8}>DoB:</Col>
//             <Col span={16}>
//               <Form.Item
//                 name="DoB"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the date of birth!",
//                   },
//                 ]}
//               >
//                 <DatePicker
//                   format="DD/MM/YYYY"
//                   style={{ width: "100%" }}
//                   placeholder="Input DOB..."
//                   onChange={handleDateChange}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={8}>User Type:</Col>
//             <Col span={16}>
//               <Form.Item
//                 name="RoleId"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please select the role of the user!",
//                   },
//                 ]}
//               >
//                 {/* <Select
//                   placeholder="Select user type: "
//                   onChange={handleUserTypeChange}
//                 >
//                   <Option value={1}>Admin</Option>
//                   <Option value={2}>Manager</Option>
//                   <Option value={3}>Staff</Option>
//                 </Select> */}
//                 <Select
//                   placeholder="Select user type: "
//                   onChange={handleUserTypeChange}
//                 >
//                   {RoleOption.map((option) => (
//                     <Option key={option.value} value={option.value}>
//                       {option.label}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             </Col>
//             {userType !== 1 && userType !== 2 && (
//               <>
//                 <Col span={8}>
//                   <p>Counter:</p>
//                 </Col>
//                 <Col span={16}>
//                   <Form.Item
//                     name="CounterId"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please select the counter!",
//                       },
//                     ]}
//                   >
//                     <Select placeholder="Select the counter...">
//                       <Option value={1}>Counter 1</Option>
//                       <Option value={2}>Counter 2</Option>
//                       <Option value={3}>Counter 3</Option>
//                     </Select>
//                   </Form.Item>
//                 </Col>
//               </>
//             )}
//           </Row>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// const RoleOption = [
//   { value: 1, label: "Admin" },
//   { value: 2, label: "Manager" },
//   { value: 3, label: "Staff" },
// ];

// const CounterOption = [
//   { value: 1, label: "Admin" },
//   { value: 2, label: "Manager" },
//   { value: 3, label: "Staff" },
// ];

// export default UpdateEmployeeModal;

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Row, Col, Radio } from "antd";
import dayjs from "dayjs";
import "../Employee.css";

const { Option } = Select;

const UpdateEmployeeModal = ({
  visible,
  onUpdate,
  onCancel,
  loading,
  employee,
}) => {
  const [form] = Form.useForm();
  const [userType, setUserType] = useState(employee?.RoleId);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        EmployeeId: employee?.EmployeeId,
        Name: employee?.Name,
        Email: employee?.Email,
        Phone: employee?.Phone,
        Gender: employee?.Gender,
        DoB: employee?.DoB ? dayjs(employee.DoB * 1000) : null,
        RoleId: employee?.RoleId,
      });
      setUserType(employee?.RoleId);
    }
  }, [form, visible, employee]);

  const handleDateChange = (date, dateString) => {
    console.log("Selected DOB:", date);
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
    if (value === 1 || value === 2) {
      form.setFieldsValue({ counter: null });
    }
  };

  return (
    <div className="update-employee-page">
      <Modal
        open={visible}
        title="Update Employee"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (values.DoB) {
                values.DoB = Math.floor(values.DoB.valueOf() / 1000);
              }
              onUpdate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Row>
            <Form.Item
              style={{ display: "none" }}
              name="EmployeeId"
              rules={[
                {
                  required: true,
                  message: "Please input the name of the user!",
                },
              ]}
            >
              <Input placeholder="Input the full name..." />
            </Form.Item>
            <Col span={8}>
              <p>Full Name:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the name of the user!",
                  },
                ]}
              >
                <Input placeholder="Input the full name..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <p>Email:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input the email of the user!",
                  },
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please input a valid email address!",
                  },
                ]}
              >
                <Input placeholder="Input the email..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <p>Phone number:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input the phone number of the user!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please input a valid 10-digit phone number!",
                  },
                ]}
              >
                <Input placeholder="Input the phone number..." />
              </Form.Item>
            </Col>
            <Col span={8}>Gender</Col>
            <Col span={16}>
              <Form.Item
                name="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please choose the gender!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={0}> Male </Radio>
                  <Radio value={1}> Female </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>DoB:</Col>
            <Col span={16}>
              <Form.Item
                name="DoB"
                rules={[
                  {
                    required: true,
                    message: "Please input the date of birth!",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  placeholder="Input DOB..."
                  onChange={handleDateChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>User Type:</Col>
            <Col span={16}>
              <Form.Item
                name="RoleId"
                rules={[
                  {
                    required: true,
                    message: "Please select the role of the user!",
                  },
                ]}
              >
                <Select
                  placeholder="Select user type: "
                  onChange={handleUserTypeChange}
                >
                  {RoleOption.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {userType !== 1 && userType !== 2 && (
              <>
                <Col span={8}>
                  <p>Counter:</p>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name="CounterId"
                    rules={[
                      {
                        required: true,
                        message: "Please select the counter!",
                      },
                    ]}
                  >
                    <Select placeholder="Select the counter...">
                      {CounterOption.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

const RoleOption = [
  { value: 1, label: "Admin" },
  { value: 2, label: "Manager" },
  { value: 3, label: "Staff" },
];

const CounterOption = [
  { value: 1, label: "Counter 1" },
  { value: 2, label: "Counter 2" },
  { value: 3, label: "Counter 3" },
];

export default UpdateEmployeeModal;
