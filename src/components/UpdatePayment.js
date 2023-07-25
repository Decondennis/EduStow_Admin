import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Form, Button } from 'react-bootstrap';

export default function UpdatePayment() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [schoolName, setSchoolName] = useState([]);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [registered_students, setRegistered_students] = useState('');
  const [transaction_code, setTransaction_code] = useState('');
  const [session, setSession] = useState('');
  const [term, setTerm] = useState('');
  const [amount, setAmount] = useState('');
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const jwt = localStorage.getItem('token') || '';
const jwtSecretKey = '70e0e03ff4bcd8e8dd79f4020e7410720a709193c64bdb3a72e37d3f7f866051';

  useEffect(() => {
    fetchSchoolName();
    getUsers();
  }, []);

  useEffect(() => {
    if (submitting && showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 9000);
    }
  }, [submitting, showAlert]);

  useEffect(() => {
    const calculatedAmount = parseInt(registered_students) * 1000;
    setAmount(calculatedAmount.toString());
  }, [registered_students]);


  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const usersData = response.data;
      setUser(usersData);
      const userIds = usersData.map((user) => user.id); // Extract userIds from the response
      setUserId(userIds.length > 0 ? userIds[0] : ''); // Update the userId state variable with the first userId or an empty string if no userIds are available
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const fetchSchoolName = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const schools = response.data;
      console.log(schools);
      setUser(schools);
      const schoolNames = schools.map((school) => school.schoolName);
      setSchoolName(schoolNames);
      const userIds = schools.map((school) => school.userId); // Extract user IDs from the response
      setUserId(userIds.length > 0 ? userIds[0] : ''); // Update the userId state variable with the first user ID or an empty string if no user IDs are available
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSchoolChange = (e) => {
    const selectedSchoolName = e.target.value;
    const selectedUser = users.find((user) => user.schoolName === selectedSchoolName);
    const selectedEmail = selectedUser ? selectedUser.email : '';
    const selectedUserId = selectedUser ? selectedUser.id : ''; // Use 'id' instead of 'userId'
    setUserId(selectedUserId);
    setEmail(selectedEmail);
  };
  
  // Function to generate a random transaction code
  const generateTransactionCode = () => {
    const codeLength = 12;
    let code = 'EDU-';
    for (let i = 0; i < codeLength; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      code += randomDigit.toString();
    }
    return code;
  };

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      const selectedUser = users.find((user) => user.schoolName === data.school_name);
      const selectedEmail = selectedUser ? selectedUser.email : '';

      const calculatedAmount = parseInt(data.registered_students) * 1000;

      const transactionCode = generateTransactionCode();

      const paymentData = {
        school_name: data.school_name,
        userId: data.userId,
        email: selectedEmail,
        session: data.session,
        term: data.term,
        registered_students: data.registered_students,
        transaction_code: transactionCode,
        amount: calculatedAmount,
      };

      console.log(paymentData);

      await axios.post('http://localhost:5000/payment', paymentData);
      getUsers();


      setShowAlert(true);
    } catch (error) {
      console.error(error);
    } finally {
        reset({
            school_name: '',
            userId: '',
            session: '',
            term: '',
            registered_students: ''
          });
    }
  };

//   const isAdmin = () => {
//     const jwtToken = localStorage.getItem('token');
//     if (jwtToken) {
//       try {
//         const decodedToken = jwt.verify(jwtToken, jwtSecretKey);
//         const userRole = decodedToken?.role;
//         return userRole === 'admin';
//       } catch (error) {
//         console.error('Error decoding token:', error);
//         return false;
//       }
//     }
//     return false;
//   };

//   useEffect(() => {
//     if (!isAdmin()) {
//       navigate('/missing'); 
//     }
//   }, [navigate]);
  
     return (

<body id="page-top">
    <div id="wrapper">
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">User Admin <sup>2</sup></div>
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
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Custom Components:</h6>
                            <a className="collapse-item" href="buttons.html">Buttons</a>
                            <a className="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
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

                <hr className="sidebar-divider"/>

            
                <div className="sidebar-heading">
                    Addons
                </div>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                        aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">Login</a>
                            <a className="collapse-item" href="register.html">Register</a>
                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div className="collapse-divider"></div>
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item" href="404.html">404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></a>
                </li>

            
                <hr className="sidebar-divider d-none d-md-block"></hr>

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>

                
                <div className="sidebar-card d-none d-lg-flex">
                    {/* <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..."> */}
                    <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                    <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
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

                        
                            <li className="nav-item dropdown no-arrow mx-1">
                                <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-bell fa-fw"></i>
                                    
                                    <span className="badge badge-danger badge-counter">3+</span>
                                </a>
                                
                                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="alertsDropdown">
                                    <h6 className="dropdown-header">
                                        Alerts Center
                                    </h6>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-primary">
                                                <i className="fas fa-file-alt text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 12, 2019</div>
                                            <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                        </div>
                                    </a>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-success">
                                                <i className="fas fa-donate text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 7, 2019</div>
                                            $290.29 has been deposited into your account!
                                        </div>
                                    </a>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="mr-3">
                                            <div className="icon-circle bg-warning">
                                                <i className="fas fa-exclamation-triangle text-white"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small text-gray-500">December 2, 2019</div>
                                            Spending Alert: We've noticed unusually high spending for your account.
                                        </div>
                                    </a>
                                    <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                </div>
                            </li>

                            <li className="nav-item dropdown no-arrow mx-1">
                                <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-envelope fa-fw"></i>
                                
                                    <span className="badge badge-danger badge-counter">7</span>
                                </a>
                                
                                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="messagesDropdown">
                                    <h6 className="dropdown-header">
                                        Message Center
                                    </h6>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            {/* <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                                alt="..."> */}
                                            <div className="status-indicator bg-success"></div>
                                        </div>
                                        <div className="font-weight-bold">
                                            <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                                problem I've been having.</div>
                                            <div className="small text-gray-500">Emily Fowler · 58m</div>
                                        </div>
                                    </a>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            {/* <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                                alt="..."> */}
                                            <div className="status-indicator"></div>
                                        </div>
                                        <div>
                                            <div className="text-truncate">I have the photos that you ordered last month, how
                                                would you like them sent to you?</div>
                                            <div className="small text-gray-500">Jae Chun · 1d</div>
                                        </div>
                                    </a>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            {/* <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                                alt="..."> */}
                                            <div className="status-indicator bg-warning"></div>
                                        </div>
                                        <div>
                                            <div className="text-truncate">Last month's report looks great, I am very happy with
                                                the progress so far, keep up the good work!</div>
                                            <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                        </div>
                                    </a>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <div className="dropdown-list-image mr-3">
                                            {/* <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                                alt="..."> */}
                                            <div className="status-indicator bg-success"></div>
                                        </div>
                                        <div>
                                            <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                                told me that people say this to all dogs, even if they aren't good...</div>
                                            <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                        </div>
                                    </a>
                                    <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                                </div>
                            </li>

                            <div className="topbar-divider d-none d-sm-block"></div>

                            
                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                    {/* <img className="img-profile rounded-circle"
                                        src="img/undraw_profile.svg"> */}
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
                                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
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
                            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                    className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                        </div>

                        <div className="row">
                        <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Earnings (Monthly)</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
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
                                                    Earnings (Annual)</div>
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
                                                    Pending Requests</div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

{/* <div className="row">
  <div className="container-fluid">
    <div> */}
        <body className="bg-gradient-primary">
                    <div className="container">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Update Payment!</h1>
                                </div>
                                {showAlert && (
                                <Alert variant="success" className="text-center" style={{ width: 'auto', height: 'auto' }}>
                                    <Alert.Heading>Your form was submitted successfully!</Alert.Heading>
                                </Alert>
                                )}
                                
                                <form className="user" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                <label htmlFor="school_name">School Name:</label>
                <select
                    {...register("school_name", { required: "Please enter your school name." })}
                    className="form-control form-control-user"
                    id="school_name"
                    name="school_name"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                    onChange={handleSchoolChange}
                >
                    <option value="">Select School Name</option>
                    {schoolName.map((school, index) => (
                    <option key={index} value={school}>
                        {school}
                    </option>
                    ))}
                </select>
                {errors.school_name && <p style={{ color: "red" }}>{errors.school_name.message}</p>}
                </div>
                <div className="col-sm-6">
                <label htmlFor="email">Email:</label>
                <input
                    {...register("email", { required: "Please enter your email." })}
                    className="form-control form-control-user"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly // Use the readOnly attribute
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                <label htmlFor="session">Session:</label>
                <select
                    {...register("session", { required: "Please enter session." })}
                    className="form-control form-control-user"
                    id="session"
                    name="session"
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                >
                    <option value="">Select Session</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2023-2024">2023-2024</option>
                    {/* Add more session options as needed */}
                </select>
                {errors.session && <p style={{ color: "red" }}>{errors.session.message}</p>}
                </div>
                <div className="col-sm-6">
                <label htmlFor="term">Term:</label>
                <select
                    {...register("term", { required: "Please enter term." })}
                    className="form-control form-control-user"
                    id="term"
                    name="term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                >
                    <option value="">Select Term</option>
                    <option value="First Term">First Term</option>
                    <option value="Second Term">Second Term</option>
                    <option value="Third Term">Third Term</option>
                </select>
                {errors.term && <p style={{ color: "red" }}>{errors.term.message}</p>}
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                <label htmlFor="registered_students">Registered Students:</label>
                <input
                    {...register("registered_students", { required: "Please enter number of registered students." })}
                    className="form-control form-control-user"
                    type="text"
                    id="registered_students"
                    name="registered_students"
                    value={registered_students}
                    onChange={(e) => setRegistered_students(e.target.value)}
                />
                {errors.registered_students && <p style={{ color: "red" }}>{errors.registered_students.message}</p>}
                </div>
                <div className="col-sm-6">
                <label htmlFor="amount">Amount:</label>
                <input
                    {...register("amount", { required: "Please enter amount." })}
                    className="form-control form-control-user"
                    type="text"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    readOnly // Use the readOnly attribute
                />
                {errors.amount && <p style={{ color: "red" }}>{errors.amount.message}</p>}
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                {...register("transaction_code")}
                type="hidden"
                name="transaction_code"
                value={transaction_code} // Replace with your actual transaction code value
                onChange={(e) => setTransaction_code(e.target.value)}
                />
                {errors.transaction_code && <p style={{ color: "red" }}>{errors.transaction_code.message}</p>}
            </div>
            <div className="col-sm-6">
                <label htmlFor="userId"></label>
                <input
                {...register("userId")}
                type="hidden"
                id="userId"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                />
                {errors.userId && <p style={{ color: "red" }}>{errors.userId.message}</p>}
            </div>
            </div>
            <button className="btn btn-primary btn-user btn-block" type="submit">
                Submit
            </button>
            </form>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </body>
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
        </div>
        </body>
);
};