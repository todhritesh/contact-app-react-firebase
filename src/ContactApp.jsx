import {useState,useEffect} from 'react'
import {db} from './firebase-config';
import {ref , set , push, onValue , update, remove} from 'firebase/database'
import {motion} from 'framer-motion'
function ContactApp() {
  const dbref = ref(db,)
  const [formData , setFormData] = useState({name:'',contact:''});
  const [contactData , setContactData] = useState([{}]);
  const [editData ,setEditData ] = useState({name:'',contact:'',id:''})

  function submitForm (){
    if(formData.name==null || formData.contact==null){
      return ;
    }
    const contactListRef = ref(db , "contacts");
    const newContactRef = push(contactListRef);
    set(newContactRef,formData);
    setFormData({name:'',contact:''})
  }
  useEffect(()=>{
    const contactListRef = ref(db , "contacts");
    onValue(contactListRef , (snapshot) => {
      let data = []
      for(const i in snapshot.val()){
        data = [...data,{...snapshot.val()[i],id:i}]
      }
      setContactData(data);
    })
  },[])


  function handleEdit(id){
    const contactRef = ref(db , `contacts/${id}`);
    onValue(contactRef , snapshot=>{
      setEditData({...snapshot.val(),id:id})
    })
  }


  function handleUpdate(id){
    const contactRef = ref(db , `contacts/${id}`);
    update(contactRef,{name:editData.name,contact:editData.contact}).then(()=>{
      console.log('success')
    }).catch(err=>{
      console.log(err)
    })
  }

  function handleDelete(id){
    const contactRef = ref(db , `contacts/${id}`);
    remove(contactRef).then(()=>{
      console.log('deleted')
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <>
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark p-4'>
      <div className='container'>
        <motion.a initial={{y:-100}} animate={{y:5,x:5}} href="" className='navbar-brand'>Contact-App</motion.a>  
      </div>  
    </nav>
    <div className="container">
      <div className="row mt-5">
        <div  className="col-6 mt-5">
          <div className="mb-3">
            <input value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} className="form-control" placeholder="Enter name..."/>  
          </div>
          <div className="mb-3">
            <input value={formData.contact} onChange={(e) => setFormData({...formData,contact:e.target.value})} className="form-control"  placeholder="Enter contact..."/>  
          </div>
          <div className="mb-3">
            <button onClick={submitForm} className="btn btn-danger"  placeholder="Enter contact...">Add</button>  
          </div>
        </div>  

        <motion.div initial={{y:-500}} animate={{y:0}} transition={{delay:1}} className="col-6">
          <table className='table'>
            <tr>
              <th>#</th>  
              <th>Name</th>  
              <th>Contact</th>  
              <th>Action</th>  
            </tr>  

            {
              contactData.map((item,i)=>(

              <tr key={i}>
                <td>{i+1}</td>
                <td>
                {item.name}
                </td>
                <td>
                {item.contact}
                </td>
                <td className='d-inline-block'>
                  <div>
                  <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleEdit(item.id)} type="button" className='btn btn-warning'>Edit</button>
                  <button className='btn btn-danger ms-2' onClick={()=>handleDelete(item.id)} >Del</button>
                  </div>
                </td>
              </tr>  

              ))
            }
          </table>
        </motion.div>  
      </div>


<motion.div initial={{opacity:0}} animate={{opacity:1}} style={{background:'rgba(0, 0, 0, 0.63)'}} class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div style={{background:'#ffc107'}} class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title " id="exampleModalLabel">Edit Contact</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="mb-3">
            <input value={editData.name} onChange={(e)=>setEditData({...editData,name:e.target.value})} className="form-control" name="name" placeholder="Enter name..."/>  
          </div>
          <div className="mb-3">
            <input value={editData.contact} onChange={(e) => setEditData({...editData,contact:e.target.value})} className="form-control"  placeholder="Enter contact..."/>  
          </div>
      </div>
      <div class="modal-footer border border-warning">
        <button type="button" data-bs-dismiss="modal" class="btn btn-secondary" >Close</button>
        <button type="button" data-bs-dismiss="modal" onClick={()=>handleUpdate(editData.id)} class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</motion.div>


    </div>

    </>
  );
}

export default ContactApp;
