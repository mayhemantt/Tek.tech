import {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {isAuth, getCookie} from '../../actions/auth'
import {create, getCategories, removeCategory} from '../../actions/category'

const Category=()=>{
    const [values, setValues]=useState({
        name:'',
        error: false,
        success: false,
        categories:[],
        removed: false,
        reload:false
    })

    const loadCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setValues({...values, categories:data})
            }
        }
        )
    }


    const {name, error, success, categories,removed, reload}=values

    useEffect(()=>{
        loadCategories()
    },[reload])

    

    const token=getCookie('token')

    const showCategories=()=>{
        return categories.map((c,i)=>{
            return <button onDoubleClick={()=> deleteConfirm(c.slug)} title="Double Click To Delete " key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">{c.name}</button>
        })
    }

    const deleteConfirm=slug=>{
        let answer= window.confirm('Are You Sure?')
        if(answer){
            deleteCategory(slug)
        }
    }

    const deleteCategory=slug=>{
        removeCategory(slug, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setValues({...values, error:false, success: false, name:'', removed: !removed, reload: !reload})
            }
        })
    }

    const clickSubmit=(e)=>{
        e.preventDefault()
        create({name}, token).then(data=>{
            if(data.error){
                setValues({...values, error: data.error, success:false})
            }else{
                setValues({...values,error: false, success:true, name:'', removed:false, reload: !reload })
            }
        })
    }

    const handleChange=e=>{
        setValues({...values, name:e.target.value, error: false, success:false, removed:''})
    }

    const newCategoryForm =()=>{

        return <form onSubmit={clickSubmit}>
                    <div className="form-group" >
                        <label className="text-muted">Name</label>
                        <input type="text" className="form-control" onChange={handleChange} value={name} required/>
                    </div> 
                    <div>
                        <button type="submit" className="btn btn-primary">Create</button> 
                    </div>
                    
                </form>
    }

    const showSuccess =()=>{
        if(success){
            return <p className="text-success">Category Created</p>
        }
    }

    const showError =()=>{
        if(error){
            return <p className="text-danger">Category Already Exists</p>
        }
    }

    const showRemove =()=>{
        if(removed){
            return <p className="text-danger">Category Removed</p>
        }
    }
    
    const mouseMoveHandler=e=>{
        setValues({...values,error: false, success:false, removed:''})
    }

    return <React.Fragment>
            {showError()}
            {showRemove()}
            {showSuccess()}
            
            <div >
                {newCategoryForm()}
                <div onMouseMove={mouseMoveHandler} className="mt-4">
                    {showCategories()}
                </div>
                
            </div>
        </React.Fragment>

}

export default Category