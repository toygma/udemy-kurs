import { useEffect, useState } from "react"
import type { Doctor } from "../types/doctorTypes"
import { doctors } from "../constants/doctorConstants";


export const useDoctorDetail = (id:string | undefined) => {
  const [doctor,setDoctor] = useState<Doctor | undefined>(undefined);
  const [isLoading,setIsLoading] = useState<boolean>(false)


  useEffect(()=>{
    if(!id){
      setDoctor(undefined)
      return
    }

    setIsLoading(true)

    try {
      const foundDoctor = doctors.find((doc)=>doc._id === id);
      setDoctor(foundDoctor)
    } catch (error) {
      console.log(error)
      setDoctor(undefined)
    } finally {
    setIsLoading(false)
    }
  },[id])

  return {
    doctor,isLoading
  }
}