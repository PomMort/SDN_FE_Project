import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Button, Spin } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import { useGetCustomerByIdQuery } from '../../../services/customerAPI';

export default function ViewCustomerDetail() {
  const { Sider, Content } = Layout;

  const siderStyle = {
    textAlign: 'center',
    minHeight: 200,
    lineHeight: '100px',
    color: '#fff',
    backgroundColor: '#fff',
  };

  const contentStyle = {
    textAlign: 'start',
    minHeight: 100,
    lineHeight: '70px',
    color: 'black',
    backgroundColor: '#fff',
  };

  let { customerId } = useParams();
  const {
    data: customerData,
    error: customerError,
  } = useGetCustomerByIdQuery(customerId);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/customers');
  };

  return (
    <>
      {!customerError ? (
        <div className="container">
          <p className="header-detail">Customer Detail</p>
          <Layout>
            <Content style={contentStyle}>
              <div style={{ margin: '22px 0px 0px 0px', fontSize: '20px' }}>
                <p>
                  Name:
                  <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>
                    {customerData?.name}
                  </span>
                </p>
                <p>
                  Phone:
                  <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>
                    {customerData?.phone}
                  </span>
                </p>
                <p>
                  Address:
                  <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>
                    {customerData?.address}
                  </span>
                </p>
              </div>
            </Content>
          </Layout>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Button
              type="primary"
              onClick={handleBack}
              icon={<RollbackOutlined />}
            >
              Back to Customers page
            </Button>
          </div>
        </div>
      ) : (
        <div>{customerError?.data}</div>
      )}
    </>
  );
}
