import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Education = ({ education }) => {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td className='hide-sm'>{edu.fieldOfStudy}</td>
			<td>
				<Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
				{edu.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
			</td>
			<td>
				<button className='btn btn-danger'>Delete</button>
			</td>
		</tr>
	));
	if (education.length > 0) {
		return (
			<Fragment>
				<h2 className='my-2'>Education Credentials</h2>
				<table className='table'>
					<thead>
						<tr>
							<th>School or College</th>
							<th className='hide-sm'>Degree</th>
							<th className='hide-sm'>Field of Study or Branch</th>
							<th className='hide-sm'>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>{educations}</tbody>
				</table>
			</Fragment>
		);
	} else {
		return (
			<h3>
				Its Empty , Please <Link to='/add-education'>add</Link> your experience details.
			</h3>
		);
	}
};

Education.propTypes = {
	education: PropTypes.object.isRequired
};

export default connect(null)(Education);
