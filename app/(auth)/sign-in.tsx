import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/customInput';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignIn=()=>{
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [form, setForm]=useState({email:'',password:''});

    const submit=async()=>{
        if(!form.email || !form.password) return Alert.alert('Error','please enter email and password both');

        setIsSubmitting(true);

        try{
            //call appwrite signin function
            Alert.alert('Success','user signed in successfully');
            router.replace('/');

        }catch(err:any){
            Alert.alert('Error',err.message)
        }finally{
            setIsSubmitting(false);
        }

        
    }

    return(
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
            
            <CustomInput
                    placeholder='Enter your email' 
                    value={form.email} 
                    onChangeText={(text)=>{setForm((prev)=>({...prev,email:text}))}}
                    label='Email'
                    keyboardType='email-address'

                />

            <CustomInput
                    placeholder='Enter your password' 
                    value={form.password} 
                    onChangeText={(text)=>{setForm((prev)=>({...prev,password:text}))}}
                    label='Password'
                    secureTextEntry={true}
                />

            <CustomButton title='Sign In' isLoading={isSubmitting} onPress={submit}/>

            <View className='flex justify-center mt-5 flex-row gap-2'>
                <Text className='base-regular text-gray-100'>
                    Dont have an account?
                    <Link href='/sign-up' className='base-bold text-primary'>Sign Up</Link>
                </Text>
            </View>

        </View>
    )
}

export default SignIn;