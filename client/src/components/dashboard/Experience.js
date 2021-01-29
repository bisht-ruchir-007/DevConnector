import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Experience = ({ experience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.title}</td>
			<td>
				<Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
				{exp.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
			</td>
			<td>
				<button className='btn btn-danger'>Delete</button>
			</td>
		</tr>
	));

	if (experience.length > 0) {
		return (
			<Fragment>
				<h2 className='my-2'>Experience Credentials</h2>
				<table className='table'>
					<thead>
						<tr>
							<th>Company</th>
							<th className='hide-sm'>Title</th>
							<th className='hide-sm'>Years (From - To)</th>
							<th />
						</tr>
					</thead>
					<tbody>{experiences}</tbody>
				</table>
			</Fragment>
		);
	} else {
		return (
			<Fragment>
				<h2 className='my-2'>Education Credentials</h2>
				<h3>
					Its Empty , Please <Link to='/add-education'>add</Link> your experience details.
				</h3>
			</Fragment>
		);
	}
};

Experience.propTypes = {
	experience: PropTypes.object.isRequired
};

export default connect(null)(Experience);
