import React from 'react';
import SearchInput from '../components/search/SearchInput';
import PlantCard from '../components/search/PlantCard';
import fake from '../store/fake.json';
import FIlterButton from '../components/search/FIlterButton';
import { useNavigate } from 'react-router-dom';

type Fake = {
  kor: string;
  name: string;
  rank: number;
  image: string;
};

const SearchPage = () => {
  const navigate = useNavigate();
  // 타입 수정
  const goDetail = (e: any) => {
    navigate(`/plant/${e.target.id}/info`);
  };
  return (
    <div className="container px-6 pt-16 mx-auto">
      <header>
        <div className="wrap">
          <h2 className="font-semibold text-green-600">푸르댕댕</h2>
        </div>
        <SearchInput />
        <h3 className="mt-6 text-black md:text-xl">이런 식물을 찾으시나요?</h3>
        <FIlterButton />
      </header>

      <main>
        <div>
          <div className="card" onClick={goDetail}>
            {fake.map((data: Fake): JSX.Element => {
              return (
                <PlantCard
                  key={data.rank}
                  kor={data.kor}
                  name={data.name}
                  rank={data.rank - 1}
                  image={data.image}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
