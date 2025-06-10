import { eq, and, or, between, ilike, inArray, sql } from 'drizzle-orm';
import { jobs } from '../../models/job/job.model.js';
import db from '../../config/db.js';

export const searchJobs = async (req, res) => {
  try {
    const {
      keywords,
      country,
      city,
      category,
      type,
      experienceLevel,
      salaryMin,
      salaryMax,
      visaSponsorship,
      relocationAssistance,
      remoteOption,
      limit = 10,
      offset = 0,
    } = req.query;

    
    const filters = [];

    
    if (keywords) {
      filters.push(
        or(
          ilike(jobs.title, `%${keywords}%`),
          ilike(jobs.description, `%${keywords}%`)
        )
      );
    }

    
    if (country) {
      filters.push(ilike(jobs.country, `%${country}%`));
    }
    
    if (city) {
      filters.push(ilike(jobs.city, `%${city}%`));
    }

    // Job category filter
    if (category) {
      filters.push(ilike(jobs.category, `%${category}%`));
    }

    // Job type filter
    if (type) {
      filters.push(eq(jobs.type, type));
    }

    // Experience level filter
    if (experienceLevel) {
      filters.push(ilike(jobs.experienceLevel, `%${experienceLevel}%`));
    }

    // Salary range filter
    if (salaryMin && salaryMax) {
      filters.push(
        and(
          sql`${jobs.salaryMin} <= ${parseInt(salaryMax)}`,
          sql`${jobs.salaryMax} >= ${parseInt(salaryMin)}`
        )
      );
    } else if (salaryMin) {
      filters.push(sql`${jobs.salaryMax} >= ${parseInt(salaryMin)}`);
    } else if (salaryMax) {
      filters.push(sql`${jobs.salaryMin} <= ${parseInt(salaryMax)}`);
    }

    // Boolean filters
    if (visaSponsorship !== undefined) {
      filters.push(eq(jobs.visaSponsorship, visaSponsorship === 'true'));
    }
    
    if (relocationAssistance !== undefined) {
      filters.push(eq(jobs.relocationAssistance, relocationAssistance === 'true'));
    }
    
    if (remoteOption !== undefined) {
      filters.push(eq(jobs.remoteOption, remoteOption === 'true'));
    }

    // Add default filter for active jobs only
    filters.push(eq(jobs.status, 'active'));

    // Execute the query
    let query = db.select().from(jobs);
    
    if (filters.length > 0) {
      query = query.where(and(...filters));
    }

    // Add pagination
    query = query.limit(parseInt(limit)).offset(parseInt(offset));

    const results = await query;

    // Get total count for pagination
    const countQuery = db
      .select({ count: sql`count(*)` })
      .from(jobs);
    
    if (filters.length > 0) {
      countQuery.where(and(...filters));
    }
    
    const [{ count }] = await countQuery;

    return res.status(200).json({
      success: true,
      count: Number(count),
      data: results,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: Number(count),
        hasMore: Number(count) > parseInt(offset) + parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Error searching jobs:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while searching for jobs',
      error: error.message,
    });
  }
}; 