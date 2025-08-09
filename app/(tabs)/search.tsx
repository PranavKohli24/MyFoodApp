
import CartButton from '@/components/CartButton';
import Filter from '@/components/Filter';
import MenuCard from '@/components/MenuCard';
import SearchBar from '@/components/SearchBar';
import { getCategories, getMenu } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { MenuItem } from '@/type';
import cn from 'clsx';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

const Search=()=>{

    const {category, query}=useLocalSearchParams<{query:string; category:string}>()

    const {data,refetch, loading}=useAppwrite({
        fn:getMenu,
        params:{
            category,
            query,
            limit:6,

        }
    })

    const {data:categories}=useAppwrite({fn:getCategories})

    useEffect(()=>{
        refetch({category,query,limit:6})
    },[category,query])

    console.log(data)

    return(
        <SafeAreaView className='bg-white h-full'>
            {/* <Text>Search</Text>
            <Button title='Seed' onPress={()=>seed().catch((err)=>console.log("failed",err))}/> */}

            <FlatList data={data} renderItem={({item,index})=>{
                const isFirstRightColItem:any=index%2===0;

                return(
                    <View className={cn('flex-1 max-w-[48%]',!isFirstRightColItem?'mt-10':'mt-0')}>
                        <MenuCard item={item as MenuItem}/>
                    </View>
                )
            }}
            
            keyExtractor={item=>item.$id}
            numColumns={2}
            columnWrapperClassName='gap-7'
            contentContainerClassName='gap-7 px-5 pb-32'
            ListHeaderComponent={()=>(
                <View className='my-5 gap-5'>
                    <View className='flex-between flex-row w-full'>
                        <View className='flex-start'>
                            <Text className='small-bold uppercase text-primary'>Search</Text>
                            <View className='flex-start flex-row gap-x-1 mt-0.5'>
                                <Text className='paragraph-semibold text-dark-100'>Find your favourite food</Text>

                            </View>
                        </View>

                        <CartButton/>
                    </View>

                    <SearchBar/>

                    <Filter categories={categories!}/>
                </View>
            )}

            ListEmptyComponent={()=>!loading&&<Text>No results</Text>}
            />
        </SafeAreaView>
    )
}

export default Search;