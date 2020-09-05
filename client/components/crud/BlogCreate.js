import Link from 'next/link'
import {useEffect, useState} from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {getCategories } from '../../actions/category'
import {getTags } from '../../actions/tags'
import {createBlog} from '../../actions/blog'
import '../../node_modules/react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(()=> import('react-quill'), {ssr: false})

const CreateBlog=()=>{
    return  <div>
                <h2> Create Blog Form</h2>
            </div>
}

export default CreateBlog