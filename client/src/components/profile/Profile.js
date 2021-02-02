import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfilebyID } from '../../actions/profile';

const Profile = ({ match, getProfilebyID, profile: { profile, loading }, auth }) => {
	useEffect(
		() => {
			getProfilebyID(match.params.id);
		},
		[ getProfilebyID ]
	);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/developers' class='btn btn-primary'>
						Back To Profiles
					</Link>
					{auth.isAuthenticated &&
					auth.loading === false &&
					auth.user._id === profile.user._id && (
						<Link to='/edit-profile' className='btn btn-success'>
							Edit Profile
						</Link>
					)}

					<div class='profile-grid my-1'>
						<div class='profile-top bg-primary p-2'>
							<img
								class='round-img my-1'
								src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
								alt=''
							/>
							<h1 class='large'>{profile.user.name}</h1>
							<p class='lead'>Full Stack Web Developer</p>
							<p>Delhi, India</p>
							<div class='icons my-1'>
								<a href='#' target='_blank' rel='noopener noreferrer'>
									<i class='fas fa-globe fa-2x' />
								</a>
								<a href='#' target='_blank' rel='noopener noreferrer'>
									<i class='fab fa-twitter fa-2x' />
								</a>
								<a href='#' target='_blank' rel='noopener noreferrer'>
									<i class='fab fa-facebook fa-2x' />
								</a>
								<a href='#' target='_blank' rel='noopener noreferrer'>
									<i class='fab fa-linkedin fa-2x' />
								</a>
								<a href='#' target='_blank' rel='noopener noreferrer'>
									<i class='fab fa-youtube fa-2x' />
								</a>
								<a href='#' target='_blank' rel='noopener noreferrer'>
									<i class='fab fa-instagram fa-2x' />
								</a>
							</div>
						</div>

						<div class='profile-about bg-light p-2'>
							<h2 class='text-primary'>John's Bio</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed doloremque nesciunt,
								repellendus nostrum deleniti recusandae nobis neque modi perspiciatis similique?
							</p>
							<div class='line' />
							<h2 class='text-primary'>Skill Set</h2>
							<div class='skills'>
								<div class='p-1'>
									<i class='fa fa-check' /> HTML
								</div>
								<div class='p-1'>
									<i class='fa fa-check' /> CSS
								</div>
								<div class='p-1'>
									<i class='fa fa-check' /> JavaScript
								</div>
								<div class='p-1'>
									<i class='fa fa-check' /> NodeJS
								</div>
								<div class='p-1'>
									<i class='fa fa-check' /> React
								</div>
								<div class='p-1'>
									<i class='fa fa-check' /> Redux
								</div>
							</div>
						</div>

						<div class='profile-exp bg-white p-2'>
							<h2 class='text-primary'>Experience</h2>
							<div>
								<h3 class='text-dark'>Coding Ninjas</h3>
								<p>Oct 2018 - May 2019</p>
								<p>
									<strong>Position: </strong>Teaching Assistant
								</p>
								<p>
									<strong>Description: </strong>Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Dignissimos placeat, dolorum ullam ipsam, sapiente suscipit dicta eius velit
									amet aspernatur asperiores modi quidem expedita fugit.
								</p>
							</div>
							<div>
								<h3> class="text-dark">Skyquestt Technology and Consultancy</h3>
								<p>Aug 2020 - Oct 2020</p>
								<p>
									<strong>Position: </strong>Web Developer
								</p>
								<p>
									<strong>Description: </strong>Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Dignissimos placeat, dolorum ullam ipsam, sapiente suscipit dicta eius velit
									amet aspernatur asperiores modi quidem expedita fugit.
								</p>
							</div>
						</div>

						<div class='profile-edu bg-white p-2'>
							<h2 class='text-primary'>Education</h2>
							<div>
								<h3>MAIT</h3>
								<p>Sep 2017 - June 2021</p>
								<p>
									<strong>Degree: </strong>Bachelor of Technology(BTech)
								</p>
								<p>
									<strong>Field Of Study: </strong>Computer Science
								</p>
								<p>
									<strong>Description: </strong>Lorem ipsum dolor sit amet consectetur adipisicing
									elit. Dignissimos placeat, dolorum ullam ipsam, sapiente suscipit dicta eius velit
									amet aspernatur asperiores modi quidem expedita fugit.
								</p>
							</div>
						</div>

						<div class='profile-github'>
							<h2 class='text-primary my-1'>
								<i class='fab fa-github' /> Github Repos
							</h2>
							<div class='repo bg-white p-1 my-1'>
								<div>
									<h4>
										<a href='#' target='_blank' rel='noopener noreferrer'>
											Repo One
										</a>
									</h4>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
								</div>
								<div>
									<ul>
										<li class='badge badge-primary'>Stars: 44</li>
										<li class='badge badge-dark'>Watchers: 21</li>
										<li class='badge badge-light'>Forks: 25</li>
									</ul>
								</div>
							</div>
							<div class='repo bg-white p-1 my-1'>
								<div>
									<h4>
										<a href='#' target='_blank' rel='noopener noreferrer'>
											Repo Two
										</a>
									</h4>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laborum!</p>
								</div>
								<div>
									<ul>
										<li class='badge badge-primary'>Stars: 44</li>
										<li class='badge badge-dark'>Watchers: 21</li>
										<li class='badge badge-light'>Forks: 25</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfilebyID: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfilebyID })(Profile);
