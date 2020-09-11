import Link from 'next/link'
import {useEffect, useState} from 'react'
import Router from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {list, removeBlog} from '../../actions/blog'
import moment from 'moment'

export default function BlogRead(){

    const [blogs, setBlogs]= useState([])
    const [message, setMessage]= useState([])
    const token= getCookie('token')

    useEffect(()=>{
        loadBlogs()
    },[])

    const loadBlogs=()=>{
        list().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setBlogs(data)
            }
        })}
    const deleteBlog=(slug)=>{
        removeBlog(slug, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setMessage(data.message)
                loadBlogs()
            }
        })
    }

    const deleteConfirm=(slug, title)=>{
        let answer= window.confirm(`Are You Sure You Want To Delete ${title}`)
        if(answer){
            deleteBlog(slug)
        }
    }

    const showUpdateButton = blog => {
        if (isAuth() && isAuth().role === 0) {
            return (
                // console.log('User')
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className="btn btn-sm btn-warning">Update</a>
                </Link>
            );
        }else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a  className="ml-2 btn btn-sm btn-warning">Update</a>
                    </Link>
            );
        }
    };


    const showAllBlogs=()=>{
        return blogs.map((blog, i)=>{
            return(
                <div key={i} className="pb-5">
                    <h3>{blog.title}</h3>
                    <p className="mark">Written By {blog.postedBy.name} | Published On {moment(blog.updatedAt).fromNow()}</p>
                    <button onClick={()=> deleteConfirm(blog.slug, blog.title)} className="btn btn-sm btn-danger">Delete</button>
                    {showUpdateButton(blog)}
                </div>
            )
        })
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div> }
                    {showAllBlogs()}
                </div>
            </div>
            
        </React.Fragment>
    )
}

