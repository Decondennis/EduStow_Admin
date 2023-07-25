import React, { useState, useEffect } from 'react';
//import '../cssa/sb-admin-2.css';
import axios from 'axios';
import { Button, Table, Modal } from 'react-bootstrap';
import { FlutterWaveButton } from 'flutterwave-react-v3';

const jwt = localStorage.getItem('token');

const UserTransactionHistory = ({ email, schoolName, phone }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [userStatus, setUserStatus] = useState(0);
  const [activateModalVisible, setActivateModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Add user data state

  const fetchPaymentHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/userData', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setPaymentHistory(response.data.payments);
      setUserStatus(response.data.user.status);
      setUserData(response.data.user); // Set user data in state
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const handleActivateAccount = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/user/updateUserStatusByEmail',
        { status: 1, email: email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('User status updated:', response.data);
      setUserStatus(1);
      setShowPaymentModal(true);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleActivateModalClose = () => {
    setActivateModalVisible(false);
  };

  const showActivateModal = () => {
    setActivateModalVisible(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePaymentClick = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handlePaymentClickA = (payment) => {
    setSelectedPayment(payment);
    setActivateModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedPayment(null);
    setShowPaymentModal(false);
  };

  const handlePaymentCallback = async (response) => {
    console.log('Payment response:', response);
  
    if (response.status === 'successful') {
      const updatedPayment = {
        id: selectedPayment.id,
        status_flag: 1,
      };
  
      try {
        console.log('Updating payment status:', updatedPayment.id);
  
        const paymentUpdateResponse = await axios.patch(
          `http://localhost:5000/payment/${updatedPayment.id}`,
          updatedPayment,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
  
        console.log('Payment status updated:', paymentUpdateResponse.data);
  
        fetchPaymentHistory();
      } catch (error) {
        console.error('Error updating payment status:', error);
      }
    }
  };
  
  const handleAccountActivationPaymentCallback = async (response) => {
    console.log('Account activation payment response:', response);
    console.log('Handle payment callback function called');
    if (response.status === 'successful') {
      try {
        // Update the user status to 1 based on email
        const updatedUser = {
          email: response.customer.email,
          status: 1,
        };
  
        const updateResponse = await axios.put(
          'http://localhost:5000/user/updateUserStatusByEmail',
          updatedUser,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
  
        console.log('User status updated:', updateResponse.data);
        setUserStatus(1);
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    }
  };
  
   
  console.log('Payment History:', paymentHistory);

  const fwConfig = {
    public_key: 'FLWPUBK_TEST-a4be6a29b52c5a7d2aa18dc72a658154-X',
    tx_ref: Date.now(),
    amount: selectedPayment ? selectedPayment.amount : 0,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: selectedPayment ? selectedPayment.email : '',
      phone_number: selectedPayment ? selectedPayment.phone_number : '',
      name: selectedPayment ? selectedPayment.school_name : '',
    },
    customizations: {
      title: 'EduStow',
      description: 'Payment for EduStow Subscription',
      logo:
        'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
    callback: handlePaymentCallback,
    onClose: handleModalClose,
    meta: {
      disable_storage: true,
    },
  };

  const fwConfigActive = {
    public_key: 'FLWPUBK_TEST-a4be6a29b52c5a7d2aa18dc72a658154-X',
    tx_ref: Date.now(),
    amount: 1500,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userData && userData.email ? userData.email : '',
      phone_number: userData && userData.phone_number ? userData.phone_number : '',
    },
    customizations: {
      title: 'EduStow',
      description: 'Payment for EduStow Registration',
      logo:
        'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
    callback: handleAccountActivationPaymentCallback,
    onClose: handleModalClose,
    meta: {
      disable_storage: true,
    },
  };
  


     return (
<div>
<body id="page-top">
    <div id="wrapper">
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">User Dashboard</div>
                </a>

                <hr className="sidebar-divider my-0"/>

                
                <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>

            
                <hr className="sidebar-divider"/>

                
                <div className="sidebar-heading">
                    Interface
                </div>

                <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Activate Your Account</span></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>Utilities</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Utilities:</h6>
                            <a className="collapse-item" href="utilities-color.html">Colors</a>
                            <a className="collapse-item" href="utilities-border.html">Borders</a>
                            <a className="collapse-item" href="utilities-animation.html">Animations</a>
                            <a className="collapse-item" href="utilities-other.html">Other</a>
                        </div>
                    </div>
                </li>


            
                <hr className="sidebar-divider d-none d-md-block"></hr>

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>

                
                <div className="sidebar-card d-none d-lg-flex">
                    {/* <img className="sidebar-card-illustration mb-2" src={img/undraw_rocket.svg} alt="..."/>  */}
                    <p className="text-center mb-2"><strong>Pay All</strong> By clicking on pay all button you will be able to make all outstanding payment at once.</p>
                    <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Pay All</a>
                </div>

            </ul>
   

            <div id="content-wrapper" className="d-flex flex-column">

                
                <div id="content">

                    
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                            <i className="fa fa-bars"></i>
                        </button>

                        
                        <form
                            className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                    aria-label="Search" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <ul className="navbar-nav ml-auto">

                            
                            <li className="nav-item dropdown no-arrow d-sm-none">
                                <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-search fa-fw"></i>
                                </a>
                                
                                <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                    aria-labelledby="searchDropdown">
                                    <form className="form-inline mr-auto w-100 navbar-search">
                                        <div className="input-group">
                                            <input type="text" className="form-control bg-light border-0 small"
                                                placeholder="Search for..." aria-label="Search"
                                                aria-describedby="basic-addon2"/>
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="button">
                                                    <i className="fas fa-search fa-sm"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>


                            <div className="topbar-divider d-none d-sm-block"></div>

                            
                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Welcome: {userData.firstName}</span>
                                    {/* <img className="img-profile rounded-circle"
                                        src= {"img/undraw_profile.svg"} /> */}
                                </a>
                                
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Activity Log
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="Login" data-toggle="modal" data-target="#logoutModal">
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>

                        </ul>

                    </nav>

                    <div className="container-fluid">
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                            {userStatus ? (
                          <Button variant="success">Active</Button>
                        ) : (
                          <Button variant="danger" onClick={() => handlePaymentClickA(fwConfigActive)}>
                              Account: Inactive <br />
                              Click to activate
                            </Button>
                        )}



                            
   


                        </div>

                        <div className="row">
                        <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Total Registered Students</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">4000</div>
                                                
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                {/* <i className="fas fa-calendar fa-2x text-gray-300"></i> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    Subscription (Per Term)</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-info shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                                </div>
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col-auto">
                                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="progress progress-sm mr-2">
                                                            {/* <div className="progress-bar bg-info" role="progressbar"
                                                                style="width: 50%" aria-valuenow="50" aria-valuemin="0"
                                                                aria-valuemax="100"></div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-warning shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                    Pending Payment</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">201,008</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="row">

                        
                        <div class="container-fluid">

{/* <h1 class="h3 mb-2 text-gray-800">Tables</h1>
<p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
    For more information about DataTables, please visit the <a target="_blank"
        href="https://datatables.net">official DataTables documentation</a>.</p> */}


<div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Transaction History</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Transaction Code</th>
                  <th>School Name</th>
                  <th>Email</th>
                  <th>Session</th>
                  <th>Term</th>
                  <th>No. Of Registered Students</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Transaction Code</th>
                  <th>School Name</th>
                  <th>Email</th>
                  <th>Session</th>
                  <th>Term</th>
                  <th>No. Of Registered Students</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </tfoot>
              <tbody>
                {paymentHistory.map((paymentItem, index) => (
                  <tr key={paymentItem.id}>
                    <td>{index + 1}</td>
                    <td>{paymentItem.transaction_code}</td>
                    <td>{paymentItem.school_name}</td>
                    <td>{paymentItem.email}</td>
                    <td>{paymentItem.session}</td>
                    <td>{paymentItem.term}</td>
                    <td>{paymentItem.registered_students}</td>
                    <td>{paymentItem.amount}</td>
                    <td>{paymentItem.status_flag ? 'Paid' : 'Pending'}</td>
                    <td>{paymentItem.createdAt}</td>
                    <td>{paymentItem.updatedAt}</td>
                    <td>
                      {paymentItem.status_flag ? (
                        <Button variant="success">Payment Completed</Button>
                      ) : (
                        <Button variant="danger" onClick={() => handlePaymentClick(paymentItem)}>
                          Make Payment
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {paymentHistory.length === 0 && <p>No payment data available.</p>}
        </div>
      </div>
      <Modal show={showPaymentModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div>
              <p>Amount: {selectedPayment.amount}</p>
              <p>Email: {selectedPayment.email}</p>
              <p>School Name: {selectedPayment.school_name}</p>
              {/* <p>ID: {selectedPayment.id}</p> */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={handleModalClose}>
              Close
            </button>
            {selectedPayment && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px' }}>
                <FlutterWaveButton
                  {...fwConfig}
                  text="Pay Now"
                  className="btn btn-primary"
                  style={{ fontSize: '16px', padding: '10px 20px' }}
                />
              </div>
            )}
          </div>
        </Modal.Footer>
      </Modal>



      <Modal show={activateModalVisible} onHide={handleActivateModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          <div>
            <p>Amount:40000 </p>
            <p>Email: {userData.email}</p>
            <p>Name: {userData.schoolName}</p>
          </div>
       
      </Modal.Body>
      <Modal.Footer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-secondary" onClick={handleActivateModalClose}>
            Close
          </button>
          {selectedPayment && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px' }}>
              <FlutterWaveButton
                {...fwConfigActive}
                text="Pay Now"
                className="btn btn-primary"
                style={{ fontSize: '16px', padding: '10px 20px' }}
              />
            </div>
          )}
        </div>
      </Modal.Footer>
      </Modal>

    </div>
</div>


                        </div>
                        

                           

                        
                    </div>

                </div>

                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; edustow.com 2021</span>
                        </div>
                    </div>
                </footer>

                <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
        </a>

        
        <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a className="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
            </div>
        </div>
            </div>
                    
    </div>
</body>
</div>

)


}

export default UserTransactionHistory