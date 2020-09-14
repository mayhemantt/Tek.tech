import Link from 'next/link'
import {useState, useEffect} from 'react'
import Router from 'next/router'
import {getCookie, isAuth, updateUser} from '../../actions/auth'
import {getProfile, update} from '../../actions/user'
import {API} from '../../config'

export default function ProfileUpdate(){
    
    const [values, setValues]=useState({
        username:'',
        name:'',
        email:'',
        password:'',
        error:'',
        success:'',
        loading:false,
        photo:'',
        userData:'',
        about:''
    })

    const token= getCookie('token')
    const {username, name,email,password,error,about, success, loading, photo, userData} = values;

    const init=()=>{
        getProfile(token).then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({...values, username: data.username, name: data.name, email: data.email, about: data.about})
            }
        })
    }
    useEffect(()=>{
        init()
    },[])

    const handleChange=(name)=>e=>{
        const value= name === 'photo'? e.target.files[0] : e.target.value
       let  userFormData= new FormData()
        userFormData.set(name, value)
        setValues({...values, [name]: value, userData: userFormData,error : false, success:false})
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        setValues({...values, loading: true})
        update(token, userData).then(data=>{
            if(data.error){
                setValues({...values, error: data.error, success: false,loading:false})
            }else{
                updateUser(data, ()=>{
                    setValues({
                        username:data.username,
                        name:data.name,
                        email:data.email,
                        success:true,
                        loading:false,
                        about:''})
                })
                
            }
        })
    }

    const profileUpdateForm =()=>(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-info">Profile Photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input  onChange={handleChange('username')} value={username} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">name</label>
                <input  onChange={handleChange('name')} value={name} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input  onChange={handleChange('email')} type="text" value={email} className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">About</label>
                <input  onChange={handleChange('about')} type="text" value={about} className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input  onChange={handleChange('password')} type="password" value={password} className="form-control"/>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    )

    const showError=()=>(
        <div className="alert alert-danger" style={{display: error? '':'none'}}>All Fields are required</div>
    )

    const showSuccess=()=>(
        <div className="alert alert-info" style={{display: success? '':'none'}}>Successfully Updated Your Profile</div>
    )

    const showLoading=()=>(
        <div className="alert alert-info" style={{display: loading? '':'none'}}>Loading</div>
    )


    return (
        <React.Fragment>
            <div className="container">
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                <div className="row">
                    <div className="col-md-4">

                        {/* <img src={`${API}/user/photo/${username}`} 
                        className="img img-fluid mb-3"
                        style={{maxHeight: 'auto', maxWidth:'100%'}}
                        alt="user profile" /> */}
                        img
                    </div>
                    <div className="col-md-8">
                        {profileUpdateForm()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}