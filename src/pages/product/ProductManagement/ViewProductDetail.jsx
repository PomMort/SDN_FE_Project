import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../ProductManagement/ViewProductDetail.css'
import { Layout, Button, Spin } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
// import { Button } from 'bootstrap';
import { useGetProductsByIdQuery } from '../../../services/productAPI';


export default function ViewProductDetail() {
    // const [loading, setLoading] = useState(true);
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

    let { productId } = useParams();
    const {
        data: productData,
        error: productError
    } = useGetProductsByIdQuery(productId);
    // useEffect(() => {
    //     // console.log(productData);
    //     // console.log(productError);
    // }, [productData, productError]);


    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/product');
    };



    // if (loading) {
    //     return (
    //         <div className="loading-spinner">
    //             <Spin size="large" style={{ position: 'fixed', top: '45%', left: '55%', transform: 'translate(-50%, -50%)' }} />
    //         </div>
    //     );
    // }


    return (
        <>
            {!productError ? <div className='container'>
                {/* ViewProductDetail: {productId} */}
                <p className='header-detail'>Product Detail</p>
                <Layout>
                    <Sider width="55%" style={siderStyle}>
                        <div className='container-img'>
                            <img src={productData?.Img}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    marginTop: '40px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                }} />
                        </div>
                    </Sider>
                    <Content style={contentStyle}>
                        <div style={{ margin: '22px 0px 0px 0px', fontSize: '20px' }}>
                            <p>
                                Name:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.Name}</span>
                            </p>
                            <p>
                                Barcode:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.Barcode}</span>
                            </p>
                            <p>
                                Category:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.Category}</span>
                            </p>
                            <p>
                                Weight:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.Weight}</span>
                            </p>
                            <p>
                                Price:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.Price}</span>
                            </p>
                            <p>
                                Counter:
                                <span style={{ fontWeight: 'bolder', marginLeft: '10px', fontSize: '23px' }}>{productData?.CounterId}</span>
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
                        Back to Product page
                    </Button>
                </div>

            </div> :
                <div>
                    {productError?.data}
                </div>}

        </>

    )
}
