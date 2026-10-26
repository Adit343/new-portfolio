import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }
    const { name, email, subject, message } = body;

    const fields = { name, email, subject, message };
    if (Object.values(fields).some((v) => typeof v !== 'string' || !v.trim())) {
      return NextResponse.json(
        { error: 'All fields (name, email, subject, message) are required.' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 });
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
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
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
      { error: 'Failed to submit your message. Please try again later.' },
      { status: 500 }
    );
  }
}
