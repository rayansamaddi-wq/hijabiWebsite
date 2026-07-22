import React from 'react';
import Message from './Message';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Reviews = ({
  product,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  loading
}) => {
  return (
    <>
      <h2 className='text-xl font-semibold mb-4'>Reviews</h2>

      {product.reviews.length === 0 && <Message>No Reviews</Message>}

      <ul className='space-y-4'>
        {product.reviews.map(review => (
          <li key={review._id} className='border-b pb-4'>
            <strong className='block'>{review.name}</strong>
            <Rating value={review.rating} />
            <p className='text-sm text-gray-500'>
              {new Date(review.createdAt).toDateString()}
            </p>
            <p>{review.comment}</p>
          </li>
        ))}

        <li className='pt-4'>
          <h2 className='text-lg font-semibold mb-3'>
            Write a Customer Review
          </h2>

          {userInfo ? (
            <form onSubmit={submitHandler} className='space-y-4'>
              <div>
                <label className='block mb-1'>Rating</label>
                <select
                  className='w-full border rounded px-3 py-2'
                  required
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                >
                  <option value=''>Select...</option>
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </select>
              </div>

              <div>
                <label className='block mb-1'>Comment</label>
                <textarea
                  className='w-full border rounded px-3 py-2'
                  rows='3'
                  required
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                ></textarea>
              </div>

              <button
                className='w-full bg-[#d9b8ae] hover:bg-[#c7a095] text-black py-2 rounded disabled:opacity-50'
                disabled={loading}
                type='submit'
              >
                Submit
              </button>
            </form>
          ) : (
            <Message>
              Please <Link to='/login'>sign in</Link> to write a review
            </Message>
          )}
        </li>
      </ul>
    </>
  );
};

export default Reviews;