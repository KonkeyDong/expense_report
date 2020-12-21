#!/usr/bin/perl

# USE: cat a .txt file in format "mm/dd/yyyy|merchant name|$123.45" and pipe to this program.
#      Redirect STDERR to a file if necessary.

use strict;
use warnings;
use feature qw(say);
use DBI;
use Digest::SHA qw(sha256_hex);
use Data::Dumper;

my $dbh = DBI->connect("DBI:SQLite:/root/db/expense_report.db") or die "Couldn't connect to database: " . DBI->errstr;

insert($dbh);
$dbh->disconnect();
exit 0;

sub insert
{
	my ($dbh) = @_;

	my $merchant_data = get_merchant_table($dbh);
	my $sth = $dbh->prepare(qq(
		INSERT INTO expense_report (
			purchase_date,
			merchant_id,
			cost,
			note,
			hash_code
		)
		VALUES (
			?,
			?,
			?,
			?,
			?
		)	
	));

	my $i = 1;
	while (my $line = <>)
	{
		chomp $line;
		my ($date, $business, $cost) = split(/\|/, $line);
		say "inserting row $i++";
		$sth->execute(
			convert_date_to_iso_8601($date),
			get_merchant($business, $merchant_data, $line),
			convert_dollar_to_cents($cost),
			undef,
			sha256_hex($line)
		) or say STDERR "Fail: " . $line;
	}

	$sth->finish();

	return undef;
}

sub get_merchant
{
	my ($business, $merchant_data, $line) = @_;

	my $merchant_id = $merchant_data->{"$business"}->{"merchant_id"};
	return $merchant_id if $merchant_id;

	say STDERR "merchant ID not found for $line";
	return $merchant_data->{"unknown"}->{"merchant_id"};
}

sub convert_dollar_to_cents
{
	my ($cost) = @_;
	$cost =~ s/\$//;
	$cost =~ s/\.//;
	$cost =~ s/,//g;
	
	return $cost;
}

sub convert_date_to_iso_8601
{
	my ($date) = @_;
	my ($month, $day, $year) = split(/\//, $date);

	return "$year-$month-$day";
}

sub get_merchant_table
{
	my ($dbh) = @_;
	my $sth = $dbh->prepare(qq(
		SELECT *
		FROM merchant	
	));

	$sth->execute();
	my $hash_ref = $sth->fetchall_hashref("name");
	$sth->finish();

	return $hash_ref;
}
