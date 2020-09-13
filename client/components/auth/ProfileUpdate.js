import Link from 'next/link'
import {useState, useEffect} from 'react'
import Router from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {getProfile, update} from '../../actions/user'
import { setConfig } from 'next/config'

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

    }

    const handleSubmit =(e)=>{

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
                <input  onChange={handleChange('password')} type="text" value={password} className="form-control"/>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    )


    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        image
                    </div>
                    <div className="col-md-8">
                        {profileUpdateForm()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}