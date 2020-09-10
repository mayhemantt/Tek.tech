import Link from 'next/link'
import {useEffect, useState} from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {getCategories } from '../../actions/category'
import {getTags } from '../../actions/tags'
import {singleBlog, updateBlog} from '../../actions/blog'
import '../../node_modules/react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(()=> import('react-quill'), {ssr: false})
import {QuillModules,QuillFormats} from '../../helpers/quill'


const BlogUpdate = ({router}) => {

    const [body, setBody]= useState({})

    const[checked, setChecked]= useState([])
    const[checkedTag, setCheckedTag]= useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])


    const [values, setValues]=useState({
        error:'',
        success:'',
        formData:'',
        title: '',
    })
    const {error, success, formData, title}= values

    const token = getCookie('token')
    
    useEffect(()=>{
        setValues({...values, formData: new FormData()})
        initBlog()
        initCategories()
        initTags()
    },[router])

    const initBlog=()=>{
        if(router.query.slug){
            singleBlog(router.query.slug).then(data2=>{
                if(data2.error){
                    console.log(data2.error)
                }else{
                    setValues({...values, title: data2.title})
                    setBody(data2.body)
                    setCategoriesArray(data2.categories)
                    setTagsArray(data2.tags)
                }
            })
        }
    }

    const setCategoriesArray= blogCategories=>{
        let cat =[]
        blogCategories.map((c,i)=>{
            cat.push(c._id)
        })
        setChecked(cat)
    }

    const setTagsArray= blogTags=>{
        let ta =[]
        blogTags.map((t,i)=>{
            ta.push(t._id)
        })
        setCheckedTag(ta)
    }

    const initCategories=()=>{
        getCategories().then(data1=>{
            if(data1.error){
                setValues({...values, error: data1.error})
            }else{
                setCategories(data1)
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

    const handleBody=e=>{
        setBody(e)
        formData.set('body', e)
    }

    const editBlog=(e)=>{
        e.preventDefault()
        updateBlog(formData, token, router.query.slug).then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({...values, title:`${data.title}`, success: `Blog Title "${data.title}" has been updated`})
                if(isAuth() && isAuth.role===1){
                    Router.replace(`/admin/crud/${router.query.slug}`)
                }else if(isAuth() && isAuth.role===0){
                    Router.replace(`/user/crud/${router.query.slug}`)
                }
            }
        })
    }


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

    const findOutCategory=c=>{
        const result = checked.indexOf(c)
        if(result !== -1){
            return true
        }else{
            return false
        }
    }

    const findOutTag=t=>{
        const result = checkedTag.indexOf(t)
        if(result !== -1){
           return true
        }else{
            return false
        }
    }

    const showCategories=()=>{
        return (
            categories && categories.map((c,ic)=>(
                <li className="list-unstyled" key={ic}>
                    <input onChange={handleToggle(c._id)} checked={findOutCategory(c._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    const showTags=()=>{
        return (
            tags && tags.map((t,it)=>(
                <li className="list-unstyled" key={it}>
                    <input  checked={findOutTag(t._id)} onChange={handleTagsToggle(t._id)} type="checkbox" className="mr-2"/>
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        )
    }

    const handleChange= name=>e=>{
        // console.log(e.target.value)
        const value= name === 'photo'? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value, formData,})

    }

    const updateBlogForm=()=>{
        return(
            <form onSubmit={editBlog} >
                <div className="form-group" >
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')}/>
                </div>
                <div className="form-group">
                    <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder="Hii," onChange={handleBody}/>
                </div>
                <div>
                    <button className="btn btn-primary"  type="submit">Edit</button>
                </div>
            </form>
        )
    }
    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    <p>create blog form</p>
                    {updateBlogForm()}
                    <div className="pt-3">
                       
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
    );
};

export default withRouter(BlogUpdate)