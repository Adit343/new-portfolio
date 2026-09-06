import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, subject, message) are required.' },
        { status: 400 }
      );
    }

    // Check if Sanity Write Token & Project ID are configured
    if (projectId && token && projectId !== 'dummy_project_id') {
      const writeClient = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token,
      });

      const doc = await writeClient.create({
        _type: 'contactMessage',
        name,
        email,
        subject,
        message,
        submittedAt: new Date().toISOString(),
        status: 'new',
      });

      return NextResponse.json({
        success: true,
        message: 'Submission stored in Sanity CMS successfully!',
        documentId: doc._id,
      });
    }

    // Fallback response when Sanity write credentials are not yet set
    console.warn(
      'Contact form submission received, but SANITY_API_WRITE_TOKEN or NEXT_PUBLIC_SANITY_PROJECT_ID is not configured in .env.local.'
    );

    return NextResponse.json({
      success: true,
      simulated: true,
      message: 'Submission received successfully (fallback mode). Configure SANITY_API_WRITE_TOKEN in .env.local to persist directly into Sanity CMS.',
    });
  } catch (error: any) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit contact message' },
      { status: 500 }
    );
  }
}
