
import React from 'react'
import Pozdrav from '../child/page';
export type ChildPageProps = {
  name: string;
};
const ParentPage = () => {

  return (
    <div>ParentPage
      <Pozdrav name={'Ana'}  />
    </div>
  )
}

export default ParentPage
