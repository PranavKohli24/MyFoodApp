import CustomButton from '@/components/CustomButton';
import CustomHeader from '@/components/CustomHeader';
import { useCartStore } from '@/store/cart.store';
import { PaymentInfoStripeProps } from '@/type';
import cn from 'clsx';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);
const Cart=()=>{
    const {items,getTotalItems, getTotalPrice}=useCartStore();

    const totalItems:number=getTotalItems();
    const totalPrice:number=getTotalPrice();



    return(
        <SafeAreaView className='bg-white h-full'>
            <FlatList
                data={items}
                renderItem={({item})=><Text>Cart Item</Text>}

                keyExtractor={item=>item.id}
                contentContainerClassName='pb-28 px-5 pt-5'
                ListHeaderComponent={()=><CustomHeader title='Your Cart'/>}
                ListEmptyComponent={()=><Text>Cart is empty</Text>}
                ListFooterComponent={()=>totalItems>0&&(
                    <View className='gap-5'>
                        <View className='mt-6 border border-gray-200 p-5 rounded-2xl'>
                            <Text className='h3-bold text-dark-100 mb-5'>Payment Summary</Text>

                            <PaymentInfoStripe label={`Total items (${totalItems})`} value={`${totalPrice.toFixed(2)}`}/>
                            <PaymentInfoStripe label={`Delievery Fee`} value={'₹10'}/>
                            <PaymentInfoStripe label={`Discount`} value={'-₹25'} valueStyle='!text-success'/>
                            
                            <View className='border-t border-gray-300 my-2'/>

                            <PaymentInfoStripe label={`Total`} value={`${(totalPrice+ 5-25).toFixed(2)}`} labelStyle='base-bold !text-dark-100' valueStyle='base-bold !text-dark-100 !text-right'/>

                            <CustomButton title='Order Now'/>
                            
                        </View>
                    </View>
                )}
            />
            
        </SafeAreaView>
        
    )
}

export default Cart;