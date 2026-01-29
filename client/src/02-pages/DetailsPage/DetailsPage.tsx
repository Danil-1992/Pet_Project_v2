import ModalForm from '@/04-features/addComment/ModalForm';
import { getOneCard } from '@/05-entities/Goods/model/goodSlice';
import { getOneCards } from '@/05-entities/Goods/model/goodThunks';
import { addComment, getAllComments } from '@/05-entities/Response/model/responseThunks';
import { useAppDispatch, useAppSelector } from '@/06-shared/hooks/hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function DetailsPage(): React.JSX.Element {
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState<string>('');
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { goods, card } = useAppSelector((store) => store.goods);
  const { responses } = useAppSelector((store) => store.responses);


  useEffect(() => {
    if (!id) {
      return;
    }
    if (goods.length > 0) {
      dispatch(getOneCard(Number(id)));
    } else {
      dispatch(getOneCards(id));
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    const abortController = new AbortController();
    const { signal } = abortController;
    void dispatch(getAllComments({ goodId: id, signal }));
    return () => {
      abortController.abort();
    };
  }, [id, dispatch]);

  const addCommentHandler = (): void => {
    if (!id) {
      return;
    }
    void dispatch(addComment({ goodId: id, comment }));
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <p>{card?.name}</p>
          <img
            src={card?.image ? JSON.parse(card.image)[0] : ''}
            width={550}
            height={600}
            alt={card?.name || 'Изображение товара'}
          />
        </div>
        <div style={{ marginLeft: '30px', marginTop: '30px' }}>
          <p>{card?.description}</p>
          <p>{card?.features.care}</p>
          <p>{card?.features.color}</p>
          <p>{card?.features.material}</p>
          <p style={{ cursor: 'pointer' }}>{card?.features.sizes.join(', ')}</p>
        </div>
      </div>

      <div
        style={{ marginTop: '30px', fontSize: '20px', display: 'flex', justifyContent: 'center' }}
      >
        Комментарии
      </div>
      <div style={{ marginTop: '15px', cursor: 'pointer' }} onClick={() => setModal(true)}>
        Добавить коммент
      </div>
      <ModalForm isOpen={modal} onClose={() => setModal(false)}>
        <span
          style={{ paddingLeft: '325px', paddingTop: '45px', cursor: 'pointer' }}
          onClick={() => setModal(false)}
        >
          X
        </span>
        <div style={{ marginLeft: '15px', width: '100%' }}>
          <div>Комментарий:</div>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button style={{ marginTop: '65px', marginLeft: '15px' }} onClick={addCommentHandler}>
          Отправить
        </button>
      </ModalForm>
      <div>{responses.length === 0 && 'Комментарии еще не оставлены, вы можете стать первым!'}</div>
      <div>
        {responses.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            {responses.map((response) => (
              <div key={response.id} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '450px' }}>
                    <div>{response.User.name}</div>
                    <div>{response.comment}</div>
                  </div>
                  <div>{new Date(response.createdAt).toLocaleDateString('ru-RU')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
