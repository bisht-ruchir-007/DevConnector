import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Spinner from '../layout/Spinner';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(
		() => {
			getPosts();
		},
		[ getPosts ]
	);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'>{'  '}Welcome to the community</i>
				<PostForm />
				<div className='posts'>{posts.map((post) => <PostItem key={post._id} post={post} />)}</div>
			</p>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});
export default connect(mapStateToProps, { getPosts })(Posts);
