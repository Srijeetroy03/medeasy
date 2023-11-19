import React, { useEffect, useState, useRef } from 'react'
import showdown from 'showdown'
import { useSelector,useDispatch } from 'react-redux'
import { useParams,useLocation, Link, useNavigate } from 'react-router-dom'
import { getBlogFromDb, getAllBlogsFromDb } from '../../redux/actions/GetAllBlogs'
import BlogCard from '../../components/HomeBlogCard';
import { setEditBlogContent,deleteBlog} from '../../redux/actions/AddBlogActions'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Avatar from '../../images/avatar.png'
import { shareLinks } from '../../static/footerLinks';

function Blog() {
    const {blogContent, blogContentLoading, blogContentError, editBlogContent, blogList} = useSelector(state => state.blog)
    console.log('blogContent: ',blogContent);
    console.log('editBlogContent: ',editBlogContent);
    const {userInfo} = useSelector(state => state.userAuth)
    console.log('blogList: ',blogList);
    const {id} = useParams()
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(blogContent?.author);
    const [blog, setBlog] = useState(null)
    const [showDel, setShowDel] = useState(false)
    useEffect(() => {
      console.log(pathname);
      window.scrollTo(0,0)
      if(pathname === `/blog/${id}`)  
      {
        if(id !== null ){
          dispatch(getBlogFromDb(id))
          dispatch(getAllBlogsFromDb())
        }
      }
    },[pathname])

    useEffect(() => {
      if(pathname === '/edit/preview')
      {
        // setBlog(editBlogContent)
        console.log('editBlogContent: ',editBlogContent);
        const converter = new showdown.Converter()
        const html = converter.makeHtml(editBlogContent?.content)
        editBlogContent.contentHtml = html
        setBlog(editBlogContent)
      }
      else setBlog(blogContent)
    },[pathname, blogContent, editBlogContent])

    const handleEdit = async () => {
      console.log('Edit');
      await dispatch(setEditBlogContent(blog))
      navigate(`/edit`)
    }
    const handleDelete = async () => {
      console.log('Delete');
      await dispatch(deleteBlog(blog))
      navigate(`/home`)
    }

    useEffect(() => {
      if(!blogContentLoading && blogContentError === null && blog !== null && blog?.contentHtml !== null)
        document.getElementById('blog').innerHTML = blog?.contentHtml
      else document.getElementById('blog').innerHTML = null
    },[blog])

  return (
    <article className='flex flex-col md:flex-row gap-4 py-4 justify-stretch'>
      {blogContentLoading && <p>Loading...</p>}
      {blogContentError && <p>{blogContentError}</p>}
      <div className='flex flex-col items-start gap-4 font-manrope' style={{flexBasis:'100%'}}>
          <div className='flex flex-row items-center justify-between w-full animate-form'>
            {blog?.author && <p className='text-sm font-bold'>{new Date(blog?.createdAt).toString()}</p>}    
            {blog?.author && blog?.author._id === userInfo?._id && !pathname.endsWith('/preview') && 
            <div className='relative flex gap-2'>
            <button onClick={handleEdit} title='Edit'>
              <EditRoundedIcon/>
            </button>
            <button onClick={()=>setShowDel(true)} title='Delete'>
              <DeleteRoundedIcon/>
            </button>
              {showDel && <div className='absolute flex flex-col top-8 right-0 w-56 items-center z-10 bg-gray-100 rounded-lg shadow-lg overflow-hidden border'>
                <p className='p-4'>Sure you want to delete the blog?</p>
                <div className='flex border-t w-full text-center justify-between'>
                <button onClick={handleDelete} className='p-2 text-red-600 hover:text-white hover:bg-red-600 flex-1'>Delete</button>
                <button onClick={()=>setShowDel(false)} className='p-2 hover:text-white hover:bg-black border-l flex-1'>Cancel</button>
                </div>
              </div>}
            </div>}
          </div>
          {(blog?.image !== null && blog?.image) && 
          <div className='w-full h-80 md:h-[500px] overflow-hidden bg-black items-center flex justify-center'>
            <img draggable={false} loading='lazy' src={blog?.image} className='w-[100%] object-cover' />
          </div>
          }
          <h2 className='text-5xl font-manrope font-extrabold animate-form'>{blog?.title}</h2>
          <h4 className='text-xl animate-form'>{blog?.subtitle}</h4>
          <p className='text-sm animate-form text-green-600'>{blog?.genre}</p>
          {/* <p className='text-sm text-justify'>{blog?.content}</p>
          <p className='text-sm text-justify'>{blog?.content}</p> */}
          <div id='blog' className={`${blogContentLoading && 'hidden'}`}></div>
          <div className='flex flex-col md:flex-row w-full items-center justify-between gap-4'>
          {blog?.author && 
          <>
          <p className='text-sm animate-form'>- by, <span className='font-medium'>Dr. {blog?.author?.name}</span>, @{blog?.author?.username}</p>
          <ul className='md:w-full flex flex-row flex-wrap items-center justify-end gap-2'>
              {shareLinks.map((link, index) => 
              <a href={link.share(`${window.location.origin}${pathname}`,blog?.title)} target='_blank' title={`Share on ${link.title}`} className='border flex items-center justify-center rounded-full p-2 hover:scale-125 transition-all'>
                  {link.icon}
              </a>
              )}
          </ul>
          </>}
          </div>
          {blog?.author && !pathname.endsWith('/preview') &&
          <Link to={`/doctor/profile/${blog?.author?._id}`} className=' animate-form flex items-stretch gap-8 p-8 rounded w-full bg-gradient-to-b from-black/70 to-black/95 text-white hover:shadow-lg hover:cursor-pointer'>
            <div className='w-16 bg-gray-100 rounded-full overflow-hidden'>
              <img draggable={false} className='w-full object-cover' src={blog?.author?.img || Avatar} style={{aspectRatio:1/1}}/>
            </div>
            <div className='flex flex-col justify-between'>
            <p>{blog?.author?.role==='Doctor' && 'Dr. '}{blog?.author?.name} | {blog?.author?.role==='Doctor' && blog?.author?.speciality}</p>
            <div className='flex items-center gap-1'><p className='text-sm'>Check all {blog?.author?._id === userInfo?._id && <span className='text-sm'>your</span>} blogs</p> <ArrowCircleRightIcon sx={{fontSize:'20px'}}/></div>
            </div>
          </Link>}
      </div>
      {!pathname.endsWith('/preview') && blogList?.length > 1 &&
      <div className='font-manrope md:sticky top-16  border-t-2 md:border-l-2 md:border-t-0 pt-4' style={{flexBasis:'20%'}}>
        <div className='flex flex-col md:sticky top-16 md:overflow-y-scroll md:max-h-[50em] md:px-4'>
          <h3 className='border-b-4 border-red-600 font-bold bg-white md:sticky md:top-0'>Latest Updates</h3>
          {blogList?.filter(blog => blog?._id !== id).slice(0,4)?.map((blog) => (
            <BlogCard key={blog._id} blog={blog}/>
          ))}
        </div>
      </div>}
    </article>
  )
}

export default Blog