import Link from 'next/link'
import {useEffect, useState} from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {getCategories } from '../../actions/category'
import {getTags } from '../../actions/tags'
import {createBlog} from '../../actions/blog'
const ReactQuill = dynamic(()=> import('react-quill'), {ssr: false})
import {QuillModules,QuillFormats} from '../../helpers/quill'
// import '../../node_modules/react-quill/dist/quill.snow.css'


const CreateBlog=({router})=>{

    const token =getCookie('token')

    const blogFromLS=()=>{
        if(typeof window === 'undefined'){
            return false
        }
        if(localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'))
        } else{
            return false
        }
    }



    const [body, setBody]=useState(blogFromLS())
    const [values, setValues]=useState({
        error:'',
        sizeError:'',
        success:'',
        formData:'',
        title: '',
        hidePublishButton: false
    })
    const[checked, setChecked]= useState([])
    const[checkedTag, setCheckedTag]= useState([])
    

    const handleToggle=(c)=>()=>{
        setValues({...values, error: ''})
        const clickedCategory= checked.indexOf(c)
        const all =[...checked]

        if(clickedCategory=== -1){
            all.push(c)
        }else{
            all.splice(clickedCategory, 1)
        }

        console.log(all)
        setChecked(all)

        formData.set('categories', all)

    }

    const handleTagsToggle=(t)=>()=>{
        setValues({...values, error: ''})
        const clickedTag= checkedTag.indexOf(t)
        const all =[...checkedTag]

        if(clickedTag=== -1){
            all.push(t)
        }else{
            all.splice(clickedTag, 1)
        }

        console.log(all)
        setCheckedTag(all)

        formData.set('tags', all)

    }

    const showCategories=()=>{
        return (
            categories && categories.map((c,ic)=>(
                <li className="list-unstyled" key={ic}>
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    const showTags=()=>{
        return (
            tags && tags.map((t,it)=>(
                <li className="list-unstyled" key={it}>
                    <input onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])


    const {error, sizeError, success, formData, title, hidePublishButton}= values

    const initCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setCategories(data)
            }
        })

    }

    const initTags=()=>{
        getTags().then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setTags(data)
            }
        })
    }

    useEffect(()=>{
        setValues({...values, formData: new FormData()})
        initCategories()
        initTags()
    },[router])

    const handleChange= name=>e=>{
        // console.log(e.target.value)
        const value= name === 'photo'? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value, formData,})
    }

    const publishBlog=(e)=>{
        e.preventDefault()
        createBlog(formData,token ).then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({...values, title:' ', error:'', success: `"${data.title}" is created` })
                setBody('')
                setCategories([])
                setTags([])
            }
        })
    }

    const handleBody=e=>{
        // console.log(e)
        // setValues({...values, success:false, error:''})
        setBody(e)
        formData.set('body', e)
        if(typeof window !== undefined){
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const showError=()=>(
        <div className="alert alert-danger" style={{display: error? '': 'none'}}>
        {error}
        </div>
    )

    const showSuccess=()=>(
        <div className="alert alert-success" style={{display: success? '': 'none'}}>
        {success}
        </div>
    )


    const createBlogForm=()=>{
        return(
            <form onSubmit={publishBlog} >
                <div className="form-group" >
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')}/>
                </div>
                <div className="form-group">
                    <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder="Hii," onChange={handleBody}/>
                </div>
                <div>
                    <button className="btn btn-primary"  type="submit">Publish</button>
                </div>
            </form>
        )
    }


    return  <div className="container-fluid pb-5">
                <div className="row">
                   <div className="col-md-8" style={{marginBottom:'100px'}} > 
                        {showSuccess()}
                        {createBlogForm()}
                        <div className="pt-3">
                            {showError()}
                        </div>
                    </div> 
                    <div className="col-md-4">
                        <div className='form-group pb-2'>
                            <h5>
                                Featured Image
                            </h5>
                            <hr />
                            <small className="text-muted mr-2">Max Size: 1mb</small>
                            <label className="btn btn-outline-info">Upload Featured Image
                            <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                        <div >
                            <h5>
                                Categories
                            </h5>
                            <hr />
                            <ul style={{maxHeight:'150px', overflowY: 'scroll'}}>
                               {showCategories()}  
                            </ul>
                        </div>
                        <hr />
                        <div >
                            <h5>
                                Tags
                            </h5>
                            <hr />
                            <ul style={{maxHeight:'150px', overflowY: 'scroll'}}>
                                {showTags()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
}


export default withRouter(CreateBlog)