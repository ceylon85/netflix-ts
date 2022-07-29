import { CheckIcon } from '@heroicons/react/outline'
import { Product } from '@stripe/firestore-stripe-payments'
import React from 'react'

interface Props {
    products: Product[]
    selectedPlan: Product | null
}

function Table({ products, selectedPlan }: Props) {
    return (
        <table>
            <tbody className='divide-y divide-[gray]'>
                <tr className='tRow'>
                    <td className='tDataTitle'>
                        월 요금
                    </td>
                    {products.map((product) => (
                        <td className={`tDataFeature ${selectedPlan?.id === product.id
                            ? 'text-[#E50914]'
                            : 'text-[gray]'
                            }`} key={product.id}>
                            {(new Intl.NumberFormat("ko-KR").format(product.prices[0].unit_amount!))} 원

                        </td>
                    ))}
                </tr>
                <tr className='tRow'>
                    <td className='tDataTitle'>
                        영상 화질
                    </td>
                    {products.map((product) => (
                        <td className={`tDataFeature ${selectedPlan?.id === product.id
                                ? 'text-[#E50914]'
                                : 'text-[gray]'
                            }`} key={product.id}>{product.metadata.videoQuality}</td>
                    ))}
                </tr>
                <tr className='tRow'>
                    <td className='tDataTitle'>
                        해상도
                    </td>
                    {products.map((product) => (
                        <td className={`tDataFeature ${selectedPlan?.id === product.id
                                ? 'text-[#E50914]'
                                : 'text-[gray]'
                            }`} key={product.id}>{product.metadata.resolution}</td>
                    ))}
                </tr>
                <tr className='tRow'>
                    <td className='tDataTitle'>
                        TV, 컴퓨터, 스마트폰, 태블릿으로 시청
                    </td>
                    {products.map((product) => (
                        <td className={`tDataFeature ${selectedPlan?.id === product.id
                                ? 'text-[#E50914]'
                                : 'text-[gray]'
                            }`} key={product.id}>{product.metadata.portability === 'true' && (
                                <CheckIcon className="inline-block w-8 h-8" />
                            )}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}

export default Table