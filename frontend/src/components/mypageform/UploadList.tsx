import React, {
  useCallback,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import imageResize from '../homepage/ImageResize';
import { setMyPlant } from '../../api/myPage';
import { useRecoilValue } from 'recoil';
import { validLogin } from '../../api';
import { useNavigate } from 'react-router-dom';

type ListProps = {
  id: number;
  checked: number;
  files: string[];
  setFiles: any;
  setImgUrl: any;
  setImgFile: any;
  imgFile: any;
  pushPlantInfo: any;
  imgagefiles: any;
  handleNamimg: any;
  plantName: string[];
  setPlantName: any;
  deleteName: any;
};

const UploadList = ({
  id,
  checked,
  files,
  setFiles,
  setImgUrl,
  setImgFile,
  imgFile,
  handleNamimg,
  plantName,
  deleteName,
}: ListProps) => {
  const isLogin = useRecoilValue(validLogin);
  const [planttitle, setPlantTitle] = useState<string>('');
  const [edit, setEdit] = useState(false);
  const inputRef: any = useRef<HTMLInputElement | null>(null);

  const onClickFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];

      selectFiles = e.target?.files;

      const target = selectFiles[0].name;
      const file_kind = target.lastIndexOf('.');
      const file_name = target.substring(file_kind + 1, target.length);
      const file_type = file_name.toLowerCase();

      const check_file_type = ['jpg', 'gif', 'png', 'jpeg', 'bmp'];

      if (check_file_type.indexOf(file_type) === -1) {
        alert('님 이거 사진 아니자늠');
        return;
      }

      imageResize({
        file: selectFiles[0],
        maxSize: 400,
      })
        .then(res => {
          setImage(res);
        })
        .catch(function (err) {
          console.error(err);
        });
    },
    [],
  );

  useEffect(() => {
    if (plantName[id - 1] !== undefined) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [plantName]);

  const setImage = (res: any) => {
    const imageFile = res;
    // console.log(imageFile[1]);
    setImgFile(imageFile);
    setImgUrl(imageFile[1]);
  };

  const handleDelete = (number: number) => {
    const delList = files;
    delList.splice(number, 1);
    setFiles([...delList]);
    setPlantTitle('');

    deleteName(number);

    // console.log([...plantName]);
  };

  const handleInput = (e: any) => {
    const name = e.target.value;
    setPlantTitle(name);
    // console.log(planttitle);
  };

  // const onSubmit = (
  //   imgFile: any,
  //   planttitle: any,
  //   currentId: any,
  //   method: any,
  // ) => {
  //   console.log(imgFile, planttitle, currentId, method);
  //   // preview(imgFile).then(data => console.log(data));
  //   setMyPlant(imgFile, planttitle, currentId, method).then(data =>
  //     console.log(data),
  //   );
  // };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkName();
    }
  };

  const editName = () => {
    setEdit(false);
  };

  const checkName = () => {
    const user = isLogin?.username;
    const currentId = id - 1;
    handleNamimg(currentId, planttitle);

    setMyPlant(user, imgFile, planttitle, id).then(data => console.log(data));
    setEdit(true);
  };

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
    return;
  });

  useEffect(() => {
    if (!isLogin) {
      const navigate = useNavigate();
      alert('로그인 후 이용하실 수 있습니다.');
      navigate('/account');
    }
  }, []);

  useEffect(() => {
    // console.log(id, files[id - 1]);
    // console.log(plantName[id - 1] !== undefined);
  });

  return (
    <>
      {plantName[id - 2] !== undefined || id === 1 ? (
        <li className="mb-2">
          {files[id - 1] !== undefined ? (
            <div className="flex justify-between md:justify-between">
              <div className="flex flex-row items-end w-40 h-6 lg:w-48">
                <span className="w-14">{id}.이름 : </span>
                {edit === false || plantName[id - 1] === undefined ? (
                  <input
                    // type="text"
                    onChange={handleInput}
                    value={planttitle}
                    onKeyPress={handleKeyPress}
                    placeholder=" 이름 입력"
                    className="w-20 h-6 pl-2 border border-gray-200 resize-none lg:w-28 rounded-xl"
                    ref={inputRef}
                  ></input>
                ) : (
                  <span
                    className={` w-20 lg:w-28 h-6 overflow-hidden text-ellipsis whitespace-nowrap  ${
                      checked === id ? `text-green-500` : null
                    }`}
                  >
                    {plantName[id - 1]}
                  </span>
                )}
              </div>
              <div>
                {edit === false || plantName[id - 1] === undefined ? (
                  <div>
                    <button className="bg-sky-400 " onClick={() => checkName()}>
                      확인
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="bg-green-400 "
                      onClick={() => editName()}
                    >
                      수정
                    </button>
                    <button
                      className="bg-red-400 "
                      onClick={() => handleDelete(id - 1)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-between md:justify-between">
              <span>{id}. 파일없음</span>
              <input
                type="file"
                id={String(id)}
                style={{ display: 'none' }}
                multiple={true}
                accept="image/*"
                onChange={onClickFiles}
              />
              <label
                className="text-white bg-green-400 rounded-md"
                htmlFor={String(id)}
              >
                파일 선택
              </label>
            </div>
          )}
        </li>
      ) : null}
    </>
  );
};

export default UploadList;